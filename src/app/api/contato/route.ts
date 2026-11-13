import { NextResponse } from "next/server";

/**
 * Repasse do formulário para POST leads/ do Gestão. Fica no mesmo domínio do site (sem CORS)
 * e envia o IP de quem preencheu, para o limite por IP do Gestão valer por visitante.
 */
export async function POST(pedido: Request) {
  let corpo: unknown;
  try {
    corpo = await pedido.json();
  } catch {
    return NextResponse.json({ erro: "corpo inválido" }, { status: 400 });
  }
  const ip = (pedido.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || pedido.headers.get("x-real-ip") || "";
  const base = (process.env.GESTAO_API_URL ?? "http://localhost:8000/api/public/site/v2").replace(/\/$/, "");
  try {
    const resposta = await fetch(`${base}/leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(ip ? { "X-Forwarded-For": ip } : {}) },
      body: JSON.stringify(corpo),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return NextResponse.json(await resposta.json().catch(() => ({})), { status: resposta.status });
  } catch {
    return NextResponse.json({ erro: "indisponível" }, { status: 503 });
  }
}
