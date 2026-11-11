# V1 — Identidade nova: landing no azul do Gestão/Alcance e logo nova em tudo

Skills: /desenvolvedor-react-senior e /dev-django. Trabalhe a partir de `/Users/guilherme/dev/prodos/sistemas_prodos` (repos `web-landing-prodos`, `gestao-prodos` e `alcance_prodos`). A logo nova está em `/Users/guilherme/Documents/logos-prodos`. Eu autorizo alterar os três repositórios nesta tarefa. Plano curto, espere minha aprovação UMA vez e depois execute tudo sem parar. Sem push, sem deploy, sem mexer em servidor/DNS, sem ler `.env`. Na landing trabalhe numa branch nova (commits locais permitidos, como no README desta pasta); no Gestão e no Alcance, sem commit.

## Objetivo
1. A landing (hoje preta com dourado `#e5be5b`) passa a usar **as mesmas cores do Gestão e do Alcance**.
2. A **logo nova** (o "pd" em infinito, gradiente azul → ciano) aparece em **todos** os lugares dos três sistemas: telas, favicons, ícones de celular, PDFs e compartilhamento.
Escopo é cor e logo. Não reestruture páginas, textos nem fontes (isso é da L1). Deixe tudo em tokens para a L1 reaproveitar.

## Estado atual (conferi; reconfira com `git status`/`git diff`)
- **A troca de logo já começou e não foi commitada** nos três repos: favicons, `apple-touch-icon`, `prodos-logo.svg` nos `public/`, `SideNav`/`LoginPage` dos 3 portais do Gestão, `Marca.tsx` e `index.html` do Alcance, `LogoHeader`/`Footer`/`layout.jsx` da landing, `docs/decisoes.md` do Alcance. **Não refaça: revise, complete e valide.**
- Arquivos oficiais da marca (`logos-prodos`): `prodos-digital-logo-infinito-unido-transparente.svg` (fonte vetorial; gradiente `#2B44E8` 0% → `#1E78F0` 35% → `#06B8F8` 70% → `#00E6FF` 100%), PNGs transparentes 512/1024/2k/4k, `prodos-digital-logo-4k-fundo-escuro.png`, `prodos-digital-wallpaper-4k-infinito-unido.png` (3840x2160, fundo azul-marinho), `favicon.ico`, `favicon-16/32/64`, `android-chrome-192x192.png`, `apple-touch-icon-180x180.png`, avatar 1080. Use esses arquivos; não redesenhe a logo.
- Cores do Gestão (`frontend-*/src/theme/theme.ts`) e do Alcance (`frontend-app/src/estilos.css`), iguais entre si: primária `#3A8BFF`, botão/link `#1D6AD8` (claro), fundo claro `#EEF2F9`, cartão `#FFFFFF`, texto `#0F172A`/`#475569`; tema escuro: fundo `#060A13`, cartão `#0D1422`, texto `#EAF1FF`/`#95A6C6`, divisória `rgba(154,180,226,0.18)`; sucesso `#31D28C`, erro `#FF5C74`.
- Landing: tokens em `src/styles/_variables.scss` (`$branding`, `$bg-*`, `$text-*`, `$shadow-glow`), dourado também fixo em `ParticleBackground/index.jsx` (`GOLD = "229, 190, 91"`), `app/automacao/page.jsx` (SVG com `#e5be5b`/`rgba(229,190,91,…)`), `home`, `contatos`, `call-to-action`, `DividerSection` (`#dfa30e`), `public/lotties/faq.json` (tons bege). `public/site.webmanifest` está com `name` vazio e `theme_color` branco. `public/img/logo_full.png` virou o PNG 4k de 2,3 MB (usado em `sobre-nos`).
- Gestão: o dourado sobrou nos PDFs: `apps/common/pdf_branding.py` (`BRAND_GOLD #E0B100`, `BRAND_GOLD_DARK #B88E00`), `billing/payment_proof_pdf.py` (`_MarcaDourada`), `proposals/pdf_generator.py`, `contracts/signature_service.py` (cores fixas `#E0B100`/`#B88E00`; marca-d'água usa `frontend-admin/public/prodos-logo.png`).

## 1. Landing (web-landing-prodos)
- Troque os tokens de `_variables.scss` pelo **tema escuro do Gestão/Alcance** (o site continua escuro, agora azul-marinho, combinando com o wallpaper da logo):
  - `$bg-primary #060A13`, `$bg-secondary #0D1422`, `$bg-tertiary` um tom acima (ex.: `#16213A`), bordas e vidro com `rgba(154,180,226,…)`;
  - `$text-title #EAF1FF`, `$text-body #95A6C6`;
  - `$branding #3A8BFF` (destaques, ícones, foco, partículas) com `$branding-dim`/`$branding-glow` derivados dele;
  - botões sólidos em `#1D6AD8` com texto branco (contraste AA; `#3A8BFF` com texto branco não passa em texto pequeno), hover `#3A8BFF`;
  - novo token `$gradiente-marca: linear-gradient(135deg, #2B44E8 0%, #1E78F0 35%, #06B8F8 70%, #00E6FF 100%)`, usado com moderação (palavra de destaque do título, linha/realce de seção, brilho do CTA). Nunca texto corrido em gradiente.
- Elimine **todo** dourado/âmbar: troque valores fixos por tokens (inclusive em JSX: partículas, SVGs de `automacao`, `DividerSection`). Ajuste os tons bege do `faq.json` para a paleta. Seleção de texto, foco visível, barra de rolagem e cursor personalizado no azul.
- Fotos de fundo (`bg_home_*`): mantenha; se algum overlay for quente, troque por azul-marinho `#060A13` com transparência.
- Logo: header e rodapé com o SVG novo (já trocado; confira proporção 748x572 do `viewBox` e nitidez); `sobre-nos` com versão leve (WebP/PNG ≤ 200 KB gerado do arquivo oficial) no lugar do PNG 4k; confira que nada aponta para `logo.png` apagado.
- Ícones e metadados: favicons e ícones do pacote oficial; `site.webmanifest` com `name "Pródos Digital"`, `short_name "Pródos"`, `theme_color` e `background_color` `#060A13`, ícones 192/512 (gere o 512 a partir do PNG oficial se faltar); `<meta name="theme-color">`; imagem Open Graph 1200x630 feita do wallpaper oficial (com `metadataBase`).

## 2. Gestão (gestao-prodos)
- Revise a troca já feita nos 3 portais (admin, cliente, colaborador): `logo.ico`, `apple-touch-icon.png`, `prodos-logo.svg/png`, `SideNav` e `LoginPage` (tamanho, alinhamento, nitidez, temas claro e escuro). Os `.ico` devem ter 16/32/48–64 px reais (use os PNGs oficiais por tamanho), não um PNG grande renomeado.
- PDFs: troque o dourado pela marca nova em `pdf_branding.py` (renomeie para `BRAND_ACCENT = "#06B8F8"` para faixas/linhas/detalhes e `BRAND_ACCENT_TEXT = "#1D6AD8"` para texto em destaque, porque ciano sobre branco não tem contraste; mantenha `BRAND_BLUE`), e use esses tokens em `payment_proof_pdf.py` (renomeie `_MarcaDourada`), `proposals/pdf_generator.py` e `contracts/signature_service.py` (tire as cores fixas). Logo dos PDFs e da marca-d'água: PNG transparente oficial; confira que a marca-d'água continua discreta.
- Procure qualquer outra logo antiga ou dourado restante (e-mails, WhatsApp, admin Django, NFS-e/DANFSe, `README`, docs de identidade) e alinhe.

## 3. Alcance (alcance_prodos)
- Revise a troca já feita (`Marca.tsx`, favicon, `apple-touch-icon`, `prodos-logo.svg`, `docs/identidade`, `docs/decisoes.md`): nitidez em 28 e 48 px, temas claro e escuro, telas públicas, "Aguardando pagamento", menu no celular. Confirme que nada referencia `logo-64.png`/`logo-160.png` apagados. Procure logo antiga em e-mails, admin Django (`painel_admin`) e templates; se houver, troque.
- Cores do Alcance já são as de referência: não mude.

## 4. Conferência (obrigatória)
- Varredura final nos três repos (código, SCSS, JSX, JSON de animação, Python): nenhum `e5be5b`, `dfa30e`, `229, 190, 91`, `E0B100`, `B88E00` nem "dourad"/"gold" de identidade. Mostre o resultado do grep.
- Landing: `npm run build` e `npm run lint` sem erros; contraste AA nos textos e botões; capturas em computador (1440) e celular (390) de todas as seções em `docs/execucao/identidade-nova/`.
- Gestão: suíte de testes, `tsc` dos 3 frontends, e PDFs gerados (proposta, comprovante de pagamento, contrato com marca-d'água) convertidos em PNG nas capturas; telas de login e menu dos 3 portais em claro e escuro.
- Alcance: suíte, `tsc`, `npm test`; capturas de entrar, cadastro, painel e menu no celular, claro e escuro.
- Favicons: confira em 16, 32 e no ícone de celular que a logo é legível.

## Entrega
Relatório curto: o que mudou em cada repo, arquivos de marca usados, resultado dos testes e do grep, capturas, e pendências. Atualize o README desta pasta: a parte "visual azul" da L1 fica adiantada por este V1 (a L1 deve reutilizar os tokens criados aqui).
