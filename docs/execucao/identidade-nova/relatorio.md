# V1 — Identidade nova (11/11/2026)

Landing no tema escuro do Gestão/Alcance e logo nova (pd em infinito) nos três sistemas.
Arquivos de marca usados: pacote oficial `logos-prodos` (SVG vetorial, PNG 2k transparente, wallpaper 4k, favicons 16/32/64, android-chrome 192, apple-touch-icon 180, PNG 512 transparente).

## Landing (branch `v1-identidade-nova`, commits locais)
- Tokens em `src/styles/_variables.scss`: fundos `#060A13`/`#0D1422`/`#16213A`, texto `#EAF1FF`/`#95A6C6`, `$branding #3A8BFF`, `$botao #1D6AD8`, divisória e vidro em `rgba(154,180,226,…)`, `$gradiente-marca` e variações (`$gradiente-linha`, `$gradiente-superficie`).
- Sem dourado: partículas, fluxo da automação (SVG lê `var(--cor-marca)`), divisória, CTA, seta do select de contato, seleção de texto, foco visível, barra de rolagem e cursor. As ondas do CTA (`public/svg/*haikei.svg`) passaram do cinza para o azul-marinho.
- `faq.json`: os tons bege e o losango dourado (`#E5BE5B`) viraram tons da paleta; o "?" usa o gradiente da marca.
- A ilustração do CTA (`hand-chating.png`) tinha amarelo; só os pixels amarelos foram recoloridos para azul (as mãos ficaram como estavam).
- Logo: SVG oficial com `viewBox` recortado (748x572) no cabeçalho e no rodapé; `sobre-nos` usa `logo-sobre-nos.webp` (800x608, 62 KB) no lugar do PNG 4k de 2,3 MB.
- Metadados: `site.webmanifest` completo, `theme-color #060a13`, Open Graph/Twitter com `og-prodos-digital.jpg` (1200x630, do wallpaper oficial) e `metadataBase https://prodosdigital.com.br`.

### Contraste (WCAG)
| Par | Razão | Resultado |
|---|---|---|
| `#EAF1FF` sobre `#060A13` / `#0D1422` / `#16213A` | 17,5 / 16,3 / 14,1 | AA |
| `#95A6C6` sobre `#060A13` / `#0D1422` / `#16213A` | 8,1 / 7,5 / 6,5 | AA |
| `#3A8BFF` sobre `#060A13` / `#0D1422` / `#16213A` | 6,0 / 5,5 / 4,8 | AA |
| branco sobre `#1D6AD8` (botões) | 5,1 | AA |
| branco sobre `#2B44E8` (início do gradiente do CTA) | 6,8 | AA |
| branco sobre `#3A8BFF` | 3,3 | só texto grande, por isso não é usado em botão |

O hover dos botões segue o padrão que já existia (fundo escuro, borda e texto `#3A8BFF`, 6,0:1) em vez de fundo `#3A8BFF` com texto branco.

### Verificação
- `npm run build`: sem erros (os avisos de deprecação do Sass `@import` já existiam).
- Lint: o projeto não tem ESLint configurado e `npm run lint` abre o assistente do Next. Rodei o ESLint 8 com `next/core-web-vitals` instalado fora do projeto: 0 problemas (havia 1 aspas sem escape no texto de exemplo de `portfolio`, corrigida).
- Capturas: `landing-computador-1440-*` e `landing-celular-390-*` (topo, seções 01–06, rodapé, políticas, menu do celular) e `favicons-16-32-64-e-celular-ampliados.png`.

## Gestão e Alcance (sem commit)
Detalhes nos relatórios de `docs/execucao/identidade-nova/` de cada repositório.
