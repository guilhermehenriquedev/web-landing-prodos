# G9: CMS do site no Gestão Pródos (colar numa sessão do Claude Code do gestao-prodos)

Contexto: a landing da Pródos (repositório separado, Next.js) passa a ler todo o seu conteúdo do Gestão por uma API pública. Aqui você cria a parte do Gestão: cadastros, tela de administração, API pública e aviso de atualização. O contrato exato está no fim deste prompt e deve ser seguido à risca.

Antes de começar: leia o código do Gestão (padrões de apps Django, serializers, permissões de admin, outbox AvisoAlcance, Sistemas/Produtos do G5, storage de arquivos, Celery, frontend-admin em MUI) e mostre o plano. Espere minha aprovação. Não faça push nem deploy, não altere cobrança, faturas ou cancelamento, não leia o conteúdo de .env. Rode em etapas pequenas, com commit local por etapa.

## 1. Modelo (novo app site_cms)
- ConfiguracaoSite (registro único): nome, logos, favicon, cores, contatos, redes, rodapé, SEO padrão, IDs de analytics e verificação do Search Console.
- ItemMenu: hierárquico (pai, ordem), rótulo, tipo (pagina, externo, ancora, blog, produtos), destino, abrir em nova aba, estilo (link ou botão), visível. Máximo de 2 níveis.
- Pagina: slug único, título, SEO (título, descrição, imagem OG, canonical, noindex), status (rascunho, publicado, agendado), data de publicação. BlocoPagina: página, ordem, tipo, dados (JSON validado por esquema do tipo), visível.
- Categoria, Tag, Autor, Post: título, slug, resumo, corpo (HTML sanitizado), capa com alt obrigatório, categoria, tags, autor, SEO próprio, status, publicação e agendamento, tempo de leitura calculado, relacionados (manual ou por categoria).
- Produto do site: ligado ao Product/Sistema existente (G5), com slug, resumo, descrição, imagens, vídeo, botão de ação, blocos e SEO. Sem preços nesta versão.
- Midia: arquivo, tipo, tamanho, largura e altura, alt, redimensionamento automático (várias larguras) e conversão para WebP. Limite de tipo e tamanho. Reaproveite o storage já usado pelo Gestão.
- Redirecionamento (301) e Lead (reaproveite o modelo de leads/oportunidades se existir).
- Slugs únicos, sem colisão com rotas reservadas. Histórico de versões simples de página e post (últimas 10).

## 2. API de administração (apenas perfil administrador)
CRUD de tudo acima, reordenação de menu e de blocos, upload de mídia, validação dos blocos pelo esquema, ação de publicar, despublicar e agendar, e geração de link de prévia de rascunho.

## 3. API pública
Implemente exatamente o contrato abaixo: só conteúdo publicado, cache e ETag, limite de requisições, sanitização do HTML, leads com honeypot.

## 4. Aviso para a landing
Quando algo publicado mudar (publicar, editar, despublicar, excluir, mudar menu ou configuração), enfileirar um aviso assinado para {LANDING_URL}/api/revalidar, com tentativas e idempotência, no mesmo padrão do AvisoAlcance. A URL e o segredo vêm de variáveis de ambiente (documentar no .env.example, sem valores reais). Em desenvolvimento, a URL padrão deve apontar para a landing local, nunca para produção.

## 5. Tela "Site" no admin (MUI)
Abas: Menus (árvore com arrastar e soltar), Páginas (lista, filtros, status), Editor de página (lista de blocos reordenável, formulário por tipo de bloco, pré-visualização), Blog (posts, categorias, tags, autores), Produtos, Mídia (biblioteca com busca e alt obrigatório), Configurações, Redirecionamentos, Leads do site.
- Editor de texto rico para posts (por exemplo TipTap) com imagens da biblioteca, títulos H2 e H3, listas, links, citações.
- Checklist de SEO ao salvar, com alertas: título 50 a 60 caracteres, descrição 140 a 160, um único H1, imagem com alt, pelo menos um link interno, slug limpo. Alertas não bloqueiam, mas aparecem.
- Botão "Ver prévia" usando o link de prévia.

## 6. Testes
Modelos e restrições, validação dos blocos, permissões (só administrador), a API pública (rascunho nunca aparece, cache, limite, honeypot, sanitização), o aviso de atualização (assinatura, idempotência, tentativas), upload de mídia, e fluxo completo com dados de exemplo. Rode a suíte completa, o tsc e o build do admin, e mostre os resultados.

## 7. Entrega
Commits locais, sem push. Gere dados de exemplo (comando de gerenciamento) para a landing poder ser testada. Explique como testar cada tela.

---

# Contrato da API pública do site (Gestão -> Landing), versão 1

Fonte única. O Gestão implementa, a landing consome.

## Regras gerais
- Base: /api/public/site/v1/ (somente leitura, exceto leads). Sem autenticação, mas com limite de requisições por IP.
- Só conteúdo com status "publicado" (e data de publicação já vencida) sai por esta API. Rascunho e agendado nunca.
- Respostas em JSON, campos em português, datas em ISO 8601.
- Cabeçalhos: ETag e Cache-Control: public, max-age=60, stale-while-revalidate=300.
- Imagens sempre como objeto: {url, alt, largura, altura}. Alt é obrigatório no cadastro.
- HTML de textos ricos (corpo_html, texto_html) sanitizado no Gestão (lista de tags permitidas, sem script, sem estilos em linha).
- URLs de imagem absolutas, servidas por domínio de mídia do Gestão ou CDN.

## Endpoints (GET)
1. config/ -> {nome, logo, logo_clara, favicon, cores:{primaria,secundaria,...}, contato:{whatsapp,telefone,email,endereco|null}, redes:[{rede,url}], rodape:{texto,colunas:[{titulo,links:[{rotulo,url}]}]}, seo_padrao:{titulo,descricao,imagem_og}, scripts:{ga4_id|null,gtm_id|null,verificacao_search_console|null}}
2. menu/ -> [{id, rotulo, tipo(pagina|externo|ancora|blog|produtos), url, abrir_nova_aba, estilo(link|botao), filhos:[mesma estrutura]}] (2 níveis)
3. paginas/ -> [{slug, atualizado_em}] (para sitemap)
4. paginas/{slug}/ -> {slug, titulo, seo:{titulo,descricao,imagem_og,canonical|null,noindex}, blocos:[{id,tipo,dados}], atualizado_em}. Slug "inicio" é a home.
5. posts/?categoria=&tag=&pagina= -> {total, proxima, resultados:[{slug,titulo,resumo,capa,categoria,tags,autor,publicado_em,tempo_leitura_min}]} (12 por página)
6. posts/{slug}/ -> item acima + {corpo_html, seo, relacionados:[...], atualizado_em}
7. categorias/ -> [{slug,nome,descricao,total_posts}]
8. produtos/ e produtos/{slug}/ -> {slug,nome,resumo,descricao_html,imagens,video_url|null,cta:{rotulo,url},blocos,seo,atualizado_em}. Ligados aos Sistemas do Gestão. Nesta versão, sem preços.
9. sitemap/ -> [{tipo,url_relativa,atualizado_em}] de tudo que é indexável.
10. avaliacoes-google/ -> {nota_media|null, total|null, avaliacoes:[{autor,foto|null,nota,texto,data}], origem_url} (preenchido na etapa L4/G10; antes disso retorna lista vazia)

## Prévia de rascunho
- GET previa/{token}/ -> mesmo formato da página ou post, para o editor ver antes de publicar. Token temporário, de uso único por sessão, expira.

## Leads (POST)
- POST leads/ {nome,email,telefone|null,empresa|null,mensagem,origem(url),consentimento_lgpd:true, hp(vazio)} -> 201.
- Honeypot (hp preenchido = descarta em silêncio), limite por IP, validação de e-mail e telefone, texto limpo. Cria o lead no Gestão (reutilizar o modelo de leads/oportunidades se existir).

## Aviso de atualização (Gestão -> Landing)
- POST {LANDING_URL}/api/revalidar com cabeçalhos X-Prodos-Timestamp, X-Prodos-Assinatura (HMAC-SHA256 de "{timestamp}.{corpo}"), X-Prodos-Id (idempotência). Tolerância de 300 s.
- Corpo: {"tipo": "config|menu|pagina|post|posts|produto|categorias", "slug": "..."|null}. Ao publicar, editar, despublicar ou excluir.
- Entregue via fila com tentativas (outbox), como o AvisoAlcance.

## Tipos de bloco e campos de "dados"
- hero: titulo, subtitulo, imagem, botoes[{rotulo,url,estilo}]
- texto_rico: html
- imagem_texto: titulo, texto_html, imagem, posicao(esquerda|direita), botoes[]
- grade_cards: titulo, colunas(2|3|4), cards[{icone,titulo,texto,imagem,link}]
- botoes: alinhamento, botoes[{rotulo,url,estilo,nova_aba}]
- galeria: imagens[]
- video: url, titulo
- faq: titulo, itens[{pergunta,resposta_html}] (gera FAQPage)
- logos_clientes: titulo, itens[{nome,imagem,url|null}]
- avaliacoes_google: titulo, limite
- lista_posts: titulo, categoria|null, limite
- lista_produtos: titulo
- formulario_contato: titulo, texto
- cta: titulo, texto, botao
Blocos desconhecidos são ignorados pela landing, sem quebrar a página.
