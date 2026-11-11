# L3: a landing passa a ler o conteúdo do Gestão

Pré-requisito: G9 pronto e publicado (ou rodando local). Leia o README.md desta pasta e docs/contrato-site-api.md (fonte única). Trabalhe numa branch nova. Primeiro mostre o plano e espere minha aprovação.

## Objetivo
Trocar o conteúdo fixo (src/content/) pelo que vem da API do Gestão, mantendo o site rápido e no ar mesmo se o Gestão estiver fora.

## 1. Cliente da API
- Módulo único (src/lib/site-api.js) que chama a API com timeout, tags de cache do Next por recurso (config, menu, pagina:slug, post:slug, posts, produto:slug, categorias) e tratamento de erro.
- Se a API falhar, servir a última cópia em cache. Nunca derrubar a página por falha da API. Mostrar 404 real só quando a API disser que não existe.
- Variável de ambiente para a URL da API (documentar em .env.example).

## 2. Páginas dinâmicas
- Menu, rodapé, cores, contatos e redes vêm de config/ e menu/ (cabeçalho com submenus de 2 níveis e botão de destaque).
- Rotas: /[slug] (páginas), /blog, /blog/[slug], /blog/categoria/[slug], /produtos, /produtos/[slug]. A home vem da página "inicio".
- generateMetadata por página e post a partir do seo do contrato (title, description, canonical, OG, noindex). Um único h1 por página.
- JSON-LD: Article nos posts, BreadcrumbList, SoftwareApplication nos produtos, FAQPage nos blocos de FAQ.
- sitemap.ts a partir de sitemap/, robots.ts, 404 e redirecionamentos 301 vindos do Gestão.
- Imagens com next/image (alt, largura, altura, sizes), domínio de mídia liberado na configuração.

## 3. Blocos
- Um componente por tipo de bloco do contrato, em Server Components quando possível, no visual azul. Bloco desconhecido é ignorado.
- Formulário de contato com envio para leads/ (honeypot, mensagens de erro claras, confirmação, consentimento LGPD).

## 4. Atualização imediata
- Rota /api/revalidar: valida assinatura HMAC, tolerância de 300 s e idempotência por X-Prodos-Id, e chama revalidateTag conforme o tipo e o slug do aviso. Segredo por variável de ambiente.

## 5. Prévia
- Rota de prévia que usa previa/{token}/ do contrato, com noindex e sem cache.

## 6. Testes
- Testes do cliente (cache, falha da API, 404), da validação de assinatura e dos blocos. Rode build, lint, a verificação de rotas (h1, title, description, canonical) e o Lighthouse mobile, e mostre os resultados.
- Teste contra o Gestão local com os dados de exemplo do G9.

Entrega: commits locais, sem push.
