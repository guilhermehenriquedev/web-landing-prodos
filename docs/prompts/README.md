# Prompts da nova landing Pródos Digital

Objetivo: site azul (mesmo visual do Gestão e do Alcance), com várias páginas, blog e produtos, bem posicionado no Google (Brasil todo), conteúdo cadastrado no Gestão Pródos e publicado no mesmo servidor do Alcance e do Gestão, por pipeline.

## Ordem de execução
1. L1: fundação (visual azul, páginas, SEO técnico, desempenho). Conteúdo ainda fixo no código.
2. L2: pipeline e servidor (Docker, nginx, GitHub Actions). Valida num subdomínio de teste e só depois troca o domínio.
3. G9: CMS no Gestão (colar manualmente numa sessão do Claude Code do gestao-prodos, com plano e aprovação).
4. L3: landing passa a ler o conteúdo do Gestão (API, menus, blog, produtos, revalidação).
5. L4: conteúdo inicial, Google Search Console, avaliações do Google, formulário de leads, medição.

L1 e L2 não dependem do Gestão e já colocam o site melhor no ar. G9 deve estar publicado antes da L3.

## Regras para todas as etapas
- Não fazer push, deploy, nem mexer em DNS ou servidor sem eu pedir. Commits locais.
- Não ler nem exibir o conteúdo de arquivos .env.
- Não criar nada do projeto da landing dentro de gestao-prodos nem de alcance_prodos (leitura de referência é permitida).
- Nunca inventar depoimentos, clientes, números ou resultados. Sem depoimentos por enquanto.
- Não mostrar preços fixos no site nesta fase.
- Mostrar o resultado dos testes (build, lint, checagens) antes de concluir.
- Contrato entre landing e Gestão: docs/contrato-site-api.md (fonte única).

- V1-identidade-nova-cores-e-logos.md — antes da L1: landing no azul do Gestão/Alcance e logo nova nos três sistemas.

## Situação do V1 (feito em 11/11/2026, branch `v1-identidade-nova`)
- A parte "visual azul" da L1 já está adiantada: a landing usa o tema escuro do Gestão/Alcance e a logo nova, e não sobrou dourado.
- A L1 deve reutilizar os tokens de `src/styles/_variables.scss` em vez de criar outros: `$branding` (#3A8BFF, destaques e ícones), `$botao` (#1D6AD8, fundo de botão com texto branco), `$botao-hover`, `$bg-primary/secondary/tertiary`, `$text-title/body/contrast`, `$divisoria`, `$glass-*`, `$gradiente-marca` (só em realces, nunca em texto corrido), `$gradiente-linha` e `$gradiente-superficie` (fundo com texto branco).
- Para canvas e SVG em JSX, `globals.scss` expõe `--cor-marca`, `--cor-marca-rgb`, `--cor-fundo` e `--cor-texto-titulo`.
- As "seções de conteúdo claras" da L1 precisam de tokens claros novos; use os do tema claro do Gestão (`#EEF2F9`, `#FFFFFF`, `#0F172A`, `#475569`, links `#1D6AD8`).
- O projeto não tem ESLint configurado (`npm run lint` abre o assistente do Next). Configurar o lint fica para a L1.
- Capturas e relatório em `docs/execucao/identidade-nova/`.

- S1-site-com-blog-e-cms-no-gestao.md — substitui L1, G9, L3 e o conteúdo da L4: site com produtos, blog e SEO, conteúdo cadastrado no Gestão (sistema "Landing page Pródos"). Ordem: V1 → S1 → L2.
