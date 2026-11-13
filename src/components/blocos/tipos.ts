import type { Botao, Imagem } from "@/lib/tipos";

export type DadosHero = { titulo: string; subtitulo: string; selo?: string; imagem: Imagem | null; botoes: Botao[] };
export type DadosTexto = { titulo?: string; html: string };
export type DadosImagemTexto = { titulo: string; texto_html: string; imagem: Imagem | null; posicao: "esquerda" | "direita"; botoes: Botao[] };
export type DadosCards = { titulo: string; subtitulo?: string; colunas: 2 | 3 | 4; cards: { icone: string; titulo: string; texto: string; imagem: Imagem | null; link: string }[] };
export type DadosFaq = { titulo: string; itens: { pergunta: string; resposta_html: string }[] };
export type DadosCta = { titulo: string; texto: string; botoes: Botao[] };
export type DadosListaPosts = { titulo: string; categoria: string | null; limite: number };
export type DadosListaProdutos = { titulo: string; subtitulo?: string };
export type DadosFormulario = { titulo: string; texto: string };
export type DadosGaleria = { titulo: string; imagens: Imagem[] };
export type DadosVideo = { titulo: string; url: string };
export type DadosLogos = { titulo: string; itens: { nome: string; imagem: Imagem | null; url: string | null }[] };
