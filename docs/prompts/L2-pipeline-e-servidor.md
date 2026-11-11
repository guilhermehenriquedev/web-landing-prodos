# L2: pipeline e publicação no mesmo servidor do Alcance e do Gestão

Leia o README.md desta pasta. Estude, somente leitura, como o Alcance (alcance_prodos) e o Gestão (gestao-prodos) são publicados: pasta deploy/, docker-compose, nginx, workflows do GitHub Actions, scripts de backup e rollback. Primeiro mostre o plano e espere minha aprovação. Não rode nenhum comando no servidor, não mexa em DNS, não faça push.

## Objetivo
Publicar a landing no mesmo servidor, por pipeline (push na main), com validação num subdomínio de teste antes de trocar o domínio principal. A Vercel continua no ar até a validação terminar.

## 1. Empacotamento
- next.config.mjs com output "standalone".
- Dockerfile em múltiplas etapas, usuário sem privilégios, imagem pequena, HEALTHCHECK e rota /api/saude.
- .dockerignore, variáveis de ambiente documentadas em .env.example (sem valores reais): URL pública do site, URL da API do Gestão, segredo de revalidação.

## 2. Servidor
- Arquivos próprios da landing em deploy/ (docker-compose do serviço, bloco de nginx, script de deploy). Não altere os arquivos do Alcance nem do Gestão. Se for preciso mudar algo compartilhado (por exemplo nginx), descreva o trecho exato para eu aplicar.
- Nginx: domínio principal e www (www redireciona para o domínio sem www), HTTPS no mesmo padrão dos outros sistemas, compressão, cache longo e imutável para /_next/static, cabeçalhos de segurança (CSP compatível com o site, X-Content-Type-Options, Referrer-Policy etc.).
- Limite de memória e CPU do container, para a landing não afetar o Alcance e o Gestão.

## 3. Pipeline (GitHub Actions)
- Em push na main: instalar, lint, build, testes, construir a imagem, publicar no mesmo registro usado pelos outros projetos, fazer o deploy, checar a saúde e voltar sozinho para a imagem anterior se falhar.
- Liste os segredos que preciso cadastrar no GitHub (nomes e para que servem), sem pedir valores.

## 4. Subdomínio de teste e troca do domínio
- Publicar primeiro em um subdomínio de teste (ex.: novo.prodosdigital.com.br) com noindex, para eu validar.
- Escrever o roteiro de troca (docs/publicacao.md): reduzir o TTL do DNS antes, apontar o domínio para o servidor, conferir HTTPS, redirecionamentos, sitemap e robots, remover o noindex, e como voltar para a Vercel em minutos se algo der errado.

## 5. Entrega
Commits locais, sem push. Mostre o que foi criado, o que preciso fazer no servidor, no GitHub e no DNS, passo a passo.
