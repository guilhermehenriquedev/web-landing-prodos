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
