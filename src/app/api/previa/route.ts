import { NextResponse } from "next/server";

export function GET(pedido: Request) {
  const token = new URL(pedido.url).searchParams.get("token");
  if (!token) return NextResponse.json({ erro: "token ausente" }, { status: 400 });
  const destino = new URL("/previa", pedido.url);
  destino.searchParams.set("token", token);
  return NextResponse.redirect(destino, { status: 307, headers: { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" } });
}
