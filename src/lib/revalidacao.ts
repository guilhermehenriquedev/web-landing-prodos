import { createHmac, timingSafeEqual } from "node:crypto";

export const TOLERANCIA_SEGUNDOS = 300;
const TAG_VALIDA = /^(site|config|menu|paginas|posts|produtos|categorias|redirecionamentos|sitemap|(pagina|post|produto):[a-z0-9][a-z0-9-]{0,140})$/;

export type Aviso = { id: string; tipo: string; slug: string | null; tags: string[] };

export type ResultadoVerificacao = { ok: true; aviso: Aviso } | { ok: false; status: number; motivo: string };

export function assinar(segredo: string, timestamp: string, corpo: string): string {
  return `v1=${createHmac("sha256", segredo).update(`${timestamp}.${corpo}`).digest("hex")}`;
}

function iguais(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Confere segredo, assinatura HMAC, janela de 300 s e o formato do aviso, nessa ordem. */
export function verificarAviso(entrada: {
  segredo: string | undefined;
  corpo: string;
  timestamp: string | null;
  assinatura: string | null;
  id: string | null;
  agora?: number;
}): ResultadoVerificacao {
  if (!entrada.segredo) return { ok: false, status: 503, motivo: "segredo não configurado" };
  if (!entrada.timestamp || !entrada.assinatura || !entrada.id) return { ok: false, status: 401, motivo: "cabeçalhos ausentes" };
  if (!iguais(assinar(entrada.segredo, entrada.timestamp, entrada.corpo), entrada.assinatura)) {
    return { ok: false, status: 401, motivo: "assinatura inválida" };
  }
  const agora = entrada.agora ?? Math.floor(Date.now() / 1000);
  if (!/^\d+$/.test(entrada.timestamp) || Math.abs(agora - Number(entrada.timestamp)) > TOLERANCIA_SEGUNDOS) {
    return { ok: false, status: 401, motivo: "fora da janela de 300 s" };
  }
  let dados: Partial<Aviso>;
  try {
    dados = JSON.parse(entrada.corpo);
  } catch {
    return { ok: false, status: 400, motivo: "corpo inválido" };
  }
  if (dados.id !== entrada.id || !Array.isArray(dados.tags)) return { ok: false, status: 400, motivo: "corpo inválido" };
  const tags = dados.tags.filter((tag): tag is string => typeof tag === "string" && TAG_VALIDA.test(tag));
  return { ok: true, aviso: { id: entrada.id, tipo: String(dados.tipo ?? ""), slug: dados.slug ?? null, tags } };
}

/** Ids já processados, guardados pelo tempo da janela de assinatura (depois disso o aviso já é recusado). */
export class Idempotencia {
  private vistos = new Map<string, number>();

  jaProcessado(id: string, agora = Date.now()): boolean {
    for (const [chave, quando] of this.vistos) {
      if (agora - quando > TOLERANCIA_SEGUNDOS * 2000) this.vistos.delete(chave);
    }
    if (this.vistos.has(id)) return true;
    this.vistos.set(id, agora);
    return false;
  }
}
