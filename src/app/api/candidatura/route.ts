import { NextResponse } from "next/server";

// Currículo de até 5 MB mais os campos de texto. O Gestão confere de novo; aqui só barra o abuso antes de repassar.
const LIMITE_BYTES = 6 * 1024 * 1024;

/** Repasse do formulário de candidatura para POST candidaturas/ do Gestão, no mesmo esquema do contato. */
export async function POST(pedido: Request) {
  if (Number(pedido.headers.get("content-length") ?? 0) > LIMITE_BYTES) {
    return NextResponse.json({ curriculo: ["O currículo passa de 5 MB. Envie um arquivo menor."] }, { status: 413 });
  }
  let campos: FormData;
  try {
    campos = await pedido.formData();
  } catch {
    return NextResponse.json({ erro: "corpo inválido" }, { status: 400 });
  }
  const ip = (pedido.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || pedido.headers.get("x-real-ip") || "";
  const base = (process.env.GESTAO_API_URL ?? "http://localhost:8000/api/public/site/v2").replace(/\/$/, "");
  try {
    const resposta = await fetch(`${base}/candidaturas/`, {
      method: "POST",
      headers: ip ? { "X-Forwarded-For": ip } : {},
      body: campos,
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    return NextResponse.json(await resposta.json().catch(() => ({})), { status: resposta.status });
  } catch {
    return NextResponse.json({ erro: "indisponível" }, { status: 503 });
  }
}
