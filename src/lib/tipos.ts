// Contrato v2 da API pública do site (docs/contrato-site-api.md).

export type Imagem = {
  url: string;
  alt: string;
  largura: number;
  altura: number;
  variantes: { url: string; largura: number }[];
};

export type Botao = { rotulo: string; url: string; estilo: "primario" | "secundario" | "link"; nova_aba?: boolean };

export type Endereco = {
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string;
  uf: string;
  cep: string | null;
};

export type Config = {
  nome: string;
  descricao_curta: string;
  logo: Imagem | null;
  logo_clara: Imagem | null;
  razao_social: string | null;
  cnpj: string | null;
  contato: {
    whatsapp: string | null;
    telefone: string | null;
    email: string | null;
    horario: string | null;
    endereco: Endereco | null;
    area_atendida: string | null;
  };
  redes: { rede: string; url: string }[];
  rodape: { texto: string; colunas: { titulo: string; links: { rotulo: string; url: string }[] }[] };
  seo_padrao: { titulo: string; descricao: string; imagem_og: Imagem | null };
  scripts: { ga4_id: string | null; verificacao_search_console: string | null };
};

export type ItemMenu = {
  id: number;
  rotulo: string;
  tipo: string;
  url: string | null;
  nova_aba: boolean;
  destaque: boolean;
  filhos: ItemMenu[];
};

export type Seo = {
  titulo: string;
  descricao: string;
  imagem_og: Imagem | null;
  canonical: string | null;
  noindex: boolean;
  palavra_chave: string | null;
};

export type Bloco = { id: number; tipo: string; dados: Record<string, unknown> };

export type ResumoProduto = {
  slug: string;
  url: string;
  nome: string;
  resumo: string;
  imagem: Imagem | null;
  cta: { rotulo: string; url: string };
  atualizado_em: string;
};

export type ResumoPagina = { slug: string; tipo: string; url: string; titulo: string; atualizado_em: string };

export type Pagina = ResumoPagina & {
  resumo: string;
  seo: Seo;
  blocos: Bloco[];
  produto_relacionado: ResumoProduto | null;
  publicado_em: string | null;
};

export type ResumoPost = {
  slug: string;
  url: string;
  titulo: string;
  resumo: string;
  capa: Imagem | null;
  categoria: { slug: string; nome: string } | null;
  tags: { slug: string; nome: string }[];
  autor: { nome: string; bio: string; foto: Imagem | null } | null;
  publicado_em: string | null;
  atualizado_em: string;
  tempo_leitura_min: number;
};

export type Post = ResumoPost & {
  corpo_html: string;
  seo: Seo;
  relacionados: ResumoPost[];
  produto_relacionado: ResumoProduto | null;
};

export type ListaPosts = { total: number; pagina: number; paginas: number; proxima: number | null; resultados: ResumoPost[] };

export type Categoria = { slug: string; nome: string; descricao: string; total_posts: number };
export type Tag = { slug: string; nome: string; total_posts: number };

export type Produto = ResumoProduto & {
  titulo: string;
  seo: Seo;
  blocos: Bloco[];
  posts_relacionados: ResumoPost[];
  servicos_relacionados: ResumoPagina[];
  publicado_em: string | null;
};

export type ItemSitemap = { tipo: string; url: string; atualizado_em: string | null };
export type Redirecionamento = { origem: string; destino: string };

export type Previa =
  | { alvo: "pagina"; pagina: Pagina }
  | { alvo: "post"; post: Post }
  | { alvo: "produto"; produto: Produto };
