# Contrato da API pública do site (Gestão → Landing), versão 2

Fonte única. O Gestão implementa (app `site_cms`), a landing consome (`src/lib/site-api.ts`).
Uma cópia deste arquivo fica em `gestao-prodos/docs/contrato-site-api.md`; ao mudar o contrato, mude os dois.

## O que mudou da v1
- Base `/api/public/site/v2/`.
- O Gestão não é mais produto do site. Produtos são os sistemas vendidos por assinatura (`tipo_sistema = assinatura`), hoje só o Alcance.
- Páginas têm `tipo` (`inicio`, `livre`, `servico`, `produto`, `hub_produtos`) e `url` pronta. A página-artigo de um produto é uma página do tipo `produto` e sai dentro de `produtos/{slug}/`, não em `paginas/`.
- Menu com tipos `pagina`, `produto`, `post`, `categoria`, `blog`, `externo`, `grupo`; a `url` já vem resolvida.
- Novos: `tags/`, `redirecionamentos/`, `midia/{id}/{largura}.webp`.
- Imagens trazem `variantes`. O aviso de revalidação traz a lista de `tags` do cache a invalidar.
- Sai `avaliacoes-google/` (fica para a L4/G10) e o bloco `avaliacoes_google`; `grade_cards` passa a se chamar `cards`; sai `botoes` como bloco solto.

## Regras gerais
- Somente leitura, exceto `leads/`. Sem autenticação. Limite por IP: `SITE_API_THROTTLE_RATE` (padrão 600/min) e `SITE_LEADS_THROTTLE_RATE` (padrão 5/hora). Acima disso, 429.
- Só sai conteúdo com `status = publicado` e `publicar_em` já vencida. Rascunho e agendado nunca. Produto só com `visivel = true`. Item de menu só se o destino estiver no ar; "grupo" sem submenu no ar e "blog"/categoria sem post no ar também não saem.
- JSON, campos em português, datas ISO 8601.
- Cabeçalhos: `ETag` (responde 304 com `If-None-Match`) e `Cache-Control: public, max-age=60, stale-while-revalidate=300`. Mídia: `Cache-Control: public, max-age=31536000, immutable`.
- 404 só quando o recurso não existe ou não está no ar. A landing trata qualquer outro erro como "Gestão indisponível" (usa a última cópia) e nunca como 404.
- Imagem é sempre `{url, alt, largura, altura, variantes: [{url, largura}]}`, com URL absoluta (`SITE_API_PUBLIC_URL` + caminho). Alt é obrigatório no cadastro.
- HTML (`html`, `texto_html`, `resposta_html`, `corpo_html`) chega sanitizado: lista fechada de tags (p, h2, h3, h4, listas, a, strong, em, blockquote, img, figure, table, code), sem script, estilo em linha, eventos ou `javascript:`. Links ganham `rel="noopener noreferrer"`.

## Endpoints (GET)
| Rota | Resposta |
|---|---|
| `config/` | `{nome, descricao_curta, logo, logo_clara, razao_social, cnpj, contato:{whatsapp, telefone, email, horario, endereco, area_atendida}, redes:[{rede,url}], rodape:{texto, colunas:[{titulo, links:[{rotulo,url}]}]}, seo_padrao:{titulo, descricao, imagem_og}, scripts:{ga4_id, verificacao_search_console}}`. `endereco` é `null` sem cidade e UF; com elas, `{logradouro, numero, complemento, bairro, cidade, uf, cep}` (os outros podem ser `null`). |
| `menu/` | `[{id, rotulo, tipo, url, nova_aba, destaque, filhos:[mesma forma, sem filhos]}]` (2 níveis). `url` é `null` em "grupo". |
| `paginas/` | `[{slug, tipo, url, titulo, atualizado_em}]` (sem as páginas-artigo de produto). |
| `paginas/{slug}/` | item acima + `{resumo, seo, blocos, produto_relacionado: ResumoProduto|null, publicado_em}` |
| `posts/?categoria=&tag=&produto=&pagina=` | `{total, pagina, paginas, proxima, resultados:[ResumoPost]}`, 12 por página. |
| `posts/{slug}/` | ResumoPost + `{corpo_html, seo, relacionados:[ResumoPost], produto_relacionado}` |
| `categorias/` | `[{slug, nome, descricao, total_posts}]` |
| `tags/` | `[{slug, nome, total_posts}]` (só as com post no ar) |
| `produtos/` | `[ResumoProduto]` |
| `produtos/{slug}/` | ResumoProduto + `{titulo, seo, blocos (do artigo), posts_relacionados:[ResumoPost], servicos_relacionados:[{slug,tipo,url,titulo,atualizado_em}], publicado_em}` |
| `redirecionamentos/` | `[{origem, destino}]` (só os ativos; origem é caminho, destino é caminho ou `https://`) |
| `sitemap/` | `[{tipo, url, atualizado_em|null}]` de tudo que é indexável (sem `noindex`) |
| `midia/{id}/{largura}.webp` | Imagem WebP. Só serve variantes gravadas em `Midia` do `site_cms`; a chave do storage vem do banco, nunca da URL. |
| `previa/{token}/` | `{alvo:"pagina", pagina}` ou `{alvo:"post", post}` ou `{alvo:"produto", produto}`, inclusive rascunho. Token assinado, vale 1 hora. `Cache-Control: no-store`, `X-Robots-Tag: noindex, nofollow`. |

Formas comuns:
- `seo`: `{titulo, descricao, imagem_og, canonical|null, noindex, palavra_chave|null}`. Título e descrição vazios caem no título e no resumo do conteúdo.
- `ResumoPost`: `{slug, url, titulo, resumo, capa, categoria:{slug,nome}|null, tags:[{slug,nome}], autor:{nome,bio,foto}|null, publicado_em, atualizado_em, tempo_leitura_min}`
- `ResumoProduto`: `{slug, url, nome, resumo, imagem, cta:{rotulo,url}, atualizado_em}`. Sem preço nesta versão.

## Leads (POST `leads/`)
Corpo: `{nome, email, telefone?, empresa?, mensagem, origem, consentimento_lgpd: true, hp: ""}` → `201 {"ok": true}`.
- `hp` preenchido: responde 201 igual e descarta (honeypot).
- `consentimento_lgpd` falso, e-mail ou telefone inválidos: 400 com a mensagem do campo.
- Texto sem tags. O IP do visitante vai em `X-Forwarded-For` (a landing repassa por `/api/contato`).

## Aviso de atualização (Gestão → Landing)
- `POST {LANDING_REVALIDAR_URL}` (na landing, `/api/revalidar`) com:
  - `X-Prodos-Timestamp`: segundos Unix;
  - `X-Prodos-Assinatura`: `v1=` + HMAC-SHA256 hex de `"{timestamp}.{corpo}"` com `LANDING_REVALIDAR_SEGREDO` (= `GESTAO_REVALIDAR_SEGREDO` na landing);
  - `X-Prodos-Id`: id do aviso (idempotência; a landing responde 200 a repetições sem refazer nada).
- Corpo: `{"id", "tipo": "config|menu|pagina|post|produto|categorias|redirecionamentos|midia", "slug", "tags": [...], "ocorrido_em"}`.
- Tags válidas: `site`, `config`, `menu`, `paginas`, `posts`, `produtos`, `categorias`, `redirecionamentos`, `sitemap`, `pagina:{slug}`, `post:{slug}`, `produto:{slug}`. A landing ignora as que não casam. Ao trocar o slug, vão o antigo e o novo.
- A landing recusa assinatura errada ou timestamp a mais de 300 s (401) e sem segredo configurado responde 503.
- Entrega: o aviso nasce na mesma transação da mudança e vai para o worker assim que ela confirma (alguns segundos no ar). A tarefa `site-repescar-avisos` (a cada 60 s) refaz só os que falharam, com espera crescente de 30 s até 1 h, e desiste em 24 h (registro em Logs).
- Dispara ao publicar, editar, despublicar, agendar (na hora da publicação), excluir, mexer no menu, configuração, categorias/tags, redirecionamentos ou no alt de uma imagem. Rascunho que nunca esteve no ar não dispara.

## Tipos de bloco (`{id, tipo, dados}`)
| tipo | dados |
|---|---|
| `hero` | `titulo, subtitulo, selo, imagem, botoes[{rotulo,url,estilo(primario|secundario|link),nova_aba}]`. O primeiro hero da página é o H1. |
| `texto_rico` | `titulo, html` |
| `imagem_texto` | `titulo, texto_html, imagem, posicao(esquerda|direita), botoes[]` |
| `cards` | `titulo, subtitulo, colunas(2|3|4), cards[{icone, titulo, texto, imagem, link}]` |
| `faq` | `titulo, itens[{pergunta, resposta_html}]` (gera FAQPage) |
| `cta` | `titulo, texto, botoes[]` |
| `lista_posts` | `titulo, categoria(slug)|null, limite(1–12)` |
| `lista_produtos` | `titulo, subtitulo` |
| `formulario_contato` | `titulo, texto` |
| `galeria` | `titulo, imagens[]` |
| `video` | `titulo, url` (YouTube ou Vimeo; carrega só no clique) |
| `logos_clientes` | `titulo, itens[{nome, imagem, url|null}]` (sem itens, não aparece) |

Links de botão e card: caminho do site (`/...`), `https://`, `mailto:` ou `tel:`. Blocos de tipo desconhecido são ignorados pela landing sem quebrar a página.
