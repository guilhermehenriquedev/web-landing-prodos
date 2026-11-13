# S1 — Novo site da Pródos: produtos, blog e SEO, com o conteúdo cadastrado no Gestão

Skills: **/ui-ux-pro-max** (todo o design e a experiência do site e das telas novas do Gestão), /desenvolvedor-react-senior e /dev-django. Trabalhe a partir de `/Users/guilherme/dev/prodos/sistemas_prodos` (repos `web-landing-prodos` e `gestao-prodos`; `alcance_prodos` só para leitura). Eu autorizo alterar os dois repositórios nesta tarefa. Plano curto, espere minha aprovação UMA vez e depois execute tudo sem parar, até entregar funcionando de ponta a ponta. Sem push, sem deploy, sem mexer em servidor/DNS, sem ler `.env`. Landing: branch nova a partir de `v1-identidade-nova`, commits locais por etapa. Gestão: sem commit.

**Este prompt substitui L1, G9 e L3 e a parte de conteúdo da L4.** Leia esses arquivos e `docs/contrato-site-api.md` como referência (o desenho deles continua bom), mas o que vale é o que está aqui. A L2 (servidor e pipeline) continua separada.

## O que mudou no negócio
- O **Gestão é interno**, não é vendido. Não aparece no site como produto (tire qualquer menção comercial a ele).
- O que a Pródos vende: **produtos SaaS** (hoje o **Alcance**, outros virão) e **serviços** (sistemas sob medida, agentes de IA, automação de processos).
- O site vira uma **vitrine com blog** para a Pródos aparecer no Google em buscas de sistemas no Brasil e em **Teresina (PI)**, onde a empresa está.

## Arquitetura de informação (rotas)
- `/` início (hero, o que fazemos, produtos em destaque, serviços, últimos posts, CTA).
- `/produtos` (hub: lista os produtos publicados) e `/produtos/[slug]` (landing completa de cada produto; o Alcance é o primeiro).
- `/servicos/[slug]` (sistemas sob medida, agentes de IA, automação) e uma página local verdadeira **"Desenvolvimento de sistemas em Teresina (PI)"** com os dados reais da empresa. **Não** crie páginas geradas por cidade (o Google trata como spam de doorway).
- `/blog`, `/blog/[slug]`, `/blog/categoria/[slug]`, `/blog/tag/[slug]`.
- `/[slug]` para páginas livres (sobre, contato, políticas), 404 própria, prévia de rascunho com noindex.
- Menu do topo e submenus vêm do Gestão (2 níveis). Exemplo do que eu vou cadastrar: aba **Produtos** com submenus **Alcance** e os próximos; cada submenu abre a página completa do produto, escrita como um artigo longo (o que é, para quem é, como funciona, recursos, perguntas frequentes, CTA), ligada aos posts do blog sobre o mesmo tema.

## Gestão — o "sistema" Landing page Pródos
Em **Sistemas**, além do Alcance, entra o sistema **"Landing page Pródos"**. Ao abrir, ele mostra abas próprias de site (não as de planos, limites, créditos, cupons e usuários, que são de produto vendável). Crie um campo de tipo no `Product` (ex.: `tipo_sistema`: assinatura | site) ou o critério mais limpo que o código pedir, e use-o na `SistemaDetailPage` para escolher as abas. Crie o registro por migração de dados.
Abas do site (MUI, no padrão das telas atuais, desenhadas com /ui-ux-pro-max):
1. **Menu**: árvore de abas e submenus com arrastar e soltar (2 níveis), tipo de item (página, produto, post, categoria do blog, link externo), destino escolhido numa lista (sem digitar URL à mão), visível, botão de destaque.
2. **Produtos no site**: escolhe quais sistemas aparecem (o Alcance; nunca o Gestão nem a própria landing), slug, resumo, imagem, link de "Comece agora" (no Alcance: o cadastro em alcance.prodosdigital.com.br), a página-artigo do produto e os posts relacionados. Sem preços nesta versão.
3. **Páginas**: páginas com blocos (hero, texto rico, imagem e texto, cards, FAQ, CTA, lista de posts, lista de produtos, formulário de contato, galeria, vídeo), editor de texto rico (TipTap ou equivalente) com H2/H3, listas, links, citação e imagens da biblioteca.
4. **Blog**: posts (título, slug, resumo, capa com alt obrigatório, corpo rico, categoria, tags, autor, produto relacionado, SEO próprio, rascunho/agendado/publicado, tempo de leitura), categorias, tags e autores.
5. **Mídia**: biblioteca com busca, alt obrigatório, redimensionamento e WebP automáticos, limite de tipo e tamanho, no storage que o Gestão já usa.
6. **SEO e configurações**: nome, logos, contatos e endereço (NAP igual ao do Perfil da Empresa no Google), redes, rodapé, SEO padrão, imagem OG padrão, IDs do GA4 e da verificação do Search Console, redirecionamentos 301.
7. **Leads do site**: mensagens do formulário (reaproveite leads/oportunidades se existir), com status.
Em todo editor: **checklist de SEO ao vivo** (título 50–60, descrição 140–160, palavra-chave no título/H1/primeiro parágrafo, um único H1, alt nas imagens, ao menos 2 links internos, slug limpo), **prévia** do resultado no Google e do site, botão **Ver prévia**, histórico das últimas 10 versões, agendamento. Alertas não bloqueiam.
Backend: app novo (ex.: `site_cms`), API de administração só para admin (permissões e auditoria como nas outras telas de Sistemas), **API pública** somente leitura com cache/ETag e limite por IP, HTML sanitizado, leads com honeypot e limite, e **aviso assinado para a landing revalidar** ao publicar/editar/despublicar (outbox com tentativas, mesmo padrão dos avisos do Alcance; URL e segredo por variável de ambiente documentada sem valor). Atualize o contrato para **v2** em `docs/contrato-site-api.md` (landing) e copie para o Gestão.

## Landing (web-landing-prodos)
- **Design (/ui-ux-pro-max):** nível de site de SaaS premium, moderno e confiável. Use os tokens do V1 (`_variables.scss`). Topo e hero em azul-marinho escuro com a logo nova e o gradiente só em realces; **áreas de leitura (blog, artigos de produto, serviços) em fundo claro** com os tokens claros do Gestão (`#EEF2F9`, `#FFFFFF`, `#0F172A`, `#475569`, links `#1D6AD8`), tipografia **Plus Jakarta Sans** (a mesma do Alcance e do Gestão), largura de leitura confortável (~70 caracteres), sumário lateral nos posts longos, compartilhar, posts relacionados, CTA do produto no meio e no fim. Tire cursor personalizado e partículas; animações leves com `prefers-reduced-motion`. Mobile primeiro, nada cortado em 360 px. Botão de WhatsApp fixo.
- **Dados do Gestão:** cliente único da API com timeout e tags de cache por recurso; páginas estáticas com revalidação (ISR) e rota `/api/revalidar` que valida HMAC, tempo (300 s) e idempotência. Se o Gestão cair, o site segue no ar com a última cópia; 404 real só quando a API disser que não existe.
- **SEO técnico:** `generateMetadata` por rota, canonical, Open Graph/Twitter, `sitemap.ts` e `robots.ts` a partir da API, redirecionamentos 301, `lang="pt-BR"`, breadcrumbs visíveis, JSON-LD: Organization + WebSite (com SearchAction se houver busca), LocalBusiness/ProfessionalService com o endereço real de Teresina (só se cadastrado), BreadcrumbList, Article/BlogPosting nos posts, SoftwareApplication nos produtos (sem preço inventado), FAQPage nos blocos de FAQ. Nada de AggregateRating próprio. Links internos automáticos: produto ↔ posts da mesma categoria/tema, serviço ↔ produto.
- **Desempenho:** next/image com `sizes`, fontes com `next/font`, JS mínimo (Server Components; `"use client"` só onde há interação). Metas no celular: Lighthouse Desempenho 90+, Acessibilidade 95+, Boas práticas 95+, SEO 100; LCP < 2,5 s, CLS < 0,1.
- **Formulário de contato** → leads do Gestão (honeypot, consentimento LGPD, mensagens claras).
- Remova o que for fictício (depoimentos, clientes, números) e tudo do Gestão como produto. Portfólio e "nossos clientes" só ficam se houver dado real cadastrado; senão, a seção não aparece.
- Configure o ESLint (pendência do V1) e deixe `npm run lint` passando.

## Conteúdo inicial (cadastrado no Gestão como RASCUNHO, para eu revisar)
Comando de gestão idempotente que cria: menu (Início, Produtos › Alcance, Serviços › os 3 serviços, Blog, Sobre, Contato), configuração do site, página inicial, hub de produtos, a **página-artigo do Alcance** (mínimo 1.200 palavras, fiel aos recursos reais lidos no `alcance_prodos`: campanhas com nome de cada cliente, ritmo e horário comercial, opt-out, Kanban, atendente de IA, agenda, pedidos, automações, relatórios; sem preço, sem "nunca bloqueia", sem logo do WhatsApp), as 3 páginas de serviço, a página de Teresina, sobre, contato, políticas, e **8 posts** de 900 a 1.500 palavras com palavra-chave clara, por exemplo: o que é um sistema sob medida e quando vale a pena; como escolher uma empresa de desenvolvimento de sistemas; automação de processos para pequenas empresas; agentes de IA no atendimento; como fazer campanhas no WhatsApp sem perder clientes (respeitando opt-out); CRM em Kanban para quem vende pelo WhatsApp; quanto tempo leva para desenvolver um sistema (sem prometer prazos fixos); sistemas para empresas em Teresina. Cada post com título e descrição de SEO, capa com alt (imagens da marca ou ilustrações próprias, nada de foto de banco com marca d'água), 2+ links internos e CTA. **Nada inventado:** sem números de clientes, resultados, depoimentos ou comparações com concorrentes pelo nome. Dados da empresa que faltarem (endereço, CNPJ, telefone) ficam como pendência listada, nunca inventados.

## Testes e conferência (obrigatórios)
- Gestão: modelos e restrições, permissões, API pública (rascunho nunca aparece, cache, limite, sanitização, honeypot), aviso de revalidação (assinatura, idempotência, tentativas), mídia, migração do sistema "Landing page Pródos"; suíte completa, `tsc` e build do admin.
- Landing: testes do cliente da API (cache, Gestão fora, 404), da rota de revalidação e dos blocos; `npm run build` e `npm run lint`; script que percorre todas as rotas (status 200, um H1, title, description, canonical, sem link quebrado); validação do JSON-LD; sitemap e robots; Lighthouse mobile das rotas principais com os números.
- Ponta a ponta com os dois locais no ar (Docker do Gestão, Next da landing): publicar um post no Gestão e ver o site atualizar sozinho; trocar um submenu e ver o menu mudar; derrubar o Gestão e ver o site continuar.
- Capturas (computador 1440 e celular 390) de todas as páginas do site e de todas as abas novas do Gestão em `docs/execucao/s1/` de cada repo.

## Entrega
1. Relatório curto: o que foi feito em cada repo, decisões, resultados dos testes e do Lighthouse, capturas.
2. `docs/como-usar-o-site.md` (no Gestão): passo a passo simples para eu cadastrar aba, submenu, produto, página e post, e publicar.
3. `docs/checklist-seo.md` (na landing): o que depende de mim, em ordem: Perfil da Empresa no Google em Teresina com o mesmo nome/endereço/telefone do site, Search Console e envio do sitemap, GA4, revisar e publicar os rascunhos, ritmo de 1 a 2 posts por semana, backlinks reais (parceiros, clientes, diretórios), e a L2 para colocar no servidor.
4. Atualize o README desta pasta com a nova ordem (V1 → S1 → L2).
