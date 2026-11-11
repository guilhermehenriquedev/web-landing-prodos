# L1: fundação, visual azul e SEO técnico

Leia o README.md desta pasta e o código atual (Next.js 15, App Router, SCSS). Trabalhe numa branch nova. Primeiro mostre o plano e espere minha aprovação.

## Objetivo
Transformar a página única atual em um site de várias páginas, no azul do Gestão e do Alcance, rápido e pronto para o Google. O conteúdo continua no código por enquanto, mas organizado no mesmo formato que depois virá do Gestão (src/content/).

## 1. Visual
- Descubra, lendo os projetos irmãos (somente leitura), os tokens de cor, tipografia (Plus Jakarta Sans) e estilo de botões do Gestão (gestao-prodos) e do Alcance (alcance_prodos). Use o mesmo azul e centralize em variáveis (tokens) no SCSS.
- Substitua o dourado. Topo da home em tema escuro azulado, seções de conteúdo claras para leitura.
- Remova o cursor personalizado e as partículas 3D. Mantenha animações leves de entrada, respeitando prefers-reduced-motion.
- Cabeçalho fixo com menu (preparado para submenus de 2 níveis), menu móvel acessível, botão de WhatsApp fixo, rodapé com links.
- Mobile primeiro. Nada cortado em 360 px de largura.

## 2. Páginas e rotas (Server Components; "use client" só onde houver interação)
- / (início), /servicos/sistemas-sob-demanda, /servicos/agentes-de-ia, /servicos/automacao-de-processos
- /produtos, /produtos/alcance, /produtos/gestao (textos baseados nos sistemas reais; sem preços)
- /sobre, /contato, /politicas
- Cada página com um único h1, estrutura de títulos coerente, links internos entre serviços, produtos e contato, e CTA claro.
- Remova a seção de depoimentos (eram fictícios). Marque no código onde entrarão as avaliações do Google (L4).

## 3. SEO técnico
- metadataBase, title e description únicos por página, canonical, Open Graph e Twitter card (imagem de compartilhamento 1200x630 gerada com a marca).
- app/sitemap.ts e app/robots.ts.
- Dados estruturados em JSON-LD: Organization e WebSite no layout, BreadcrumbList nas páginas internas, SoftwareApplication nas páginas de produto, FAQPage onde houver perguntas. Não usar AggregateRating nem Review próprios (o Google não aceita avaliação do próprio site).
- Atenda o Brasil todo (areaServed: Brasil). Se faltar algum dado real (endereço, CNPJ), liste como pendência e não invente.
- Página 404 personalizada e lang pt-BR.

## 4. Desempenho e qualidade
- Converta e redimensione as imagens para WebP/AVIF com next/image, com alt. Troque o favicon e os logos de 1,6 MB por versões leves. Só apague originais pesados depois de confirmar que nada os referencia.
- Remova dependências sem uso (por exemplo react-lottie, se não for mais usado), atualize React para a versão estável e o Next para o último patch 15.x.
- Corrija: e-mail com mailto, telefone com tel, links externos com rel="noopener noreferrer", contraste e foco visível.
- Metas no celular (Lighthouse): Desempenho 90+, SEO 100, Acessibilidade 95+. Rode e mostre os números.

## 5. Testes
- npm run build e npm run lint sem erros.
- Script que percorre todas as rotas e confere: um h1, title, description e canonical presentes, status 200.
- Mostre o resultado, uma lista do que mudou e as pendências.

Entrega: commits locais na branch, sem push.
