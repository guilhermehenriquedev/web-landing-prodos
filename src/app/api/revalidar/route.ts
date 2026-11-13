import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { Idempotencia, verificarAviso } from "@/lib/revalidacao";

const processados = new Idempotencia();

export async function POST(pedido: Request) {
  const corpo = await pedido.text();
  const resultado = verificarAviso({
    segredo: process.env.GESTAO_REVALIDAR_SEGREDO,
    corpo,
    timestamp: pedido.headers.get("x-prodos-timestamp"),
    assinatura: pedido.headers.get("x-prodos-assinatura"),
    id: pedido.headers.get("x-prodos-id"),
  });
  if (!resultado.ok) return NextResponse.json({ erro: resultado.motivo }, { status: resultado.status });

  // Aviso repetido (nova tentativa do Gestão) responde 200 sem refazer nada.
  if (processados.jaProcessado(resultado.aviso.id)) return NextResponse.json({ ok: true, repetido: true });

  for (const tag of resultado.aviso.tags) revalidateTag(tag);
  return NextResponse.json({ ok: true, tags: resultado.aviso.tags });
}
