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
