# L4: conteúdo inicial, Google e medição

Pré-requisito: L3 em produção. Esta etapa mistura trabalho no site, no Gestão e tarefas manuais minhas. Primeiro mostre o plano e espere minha aprovação.

## 1. Conteúdo inicial (cadastrado no Gestão, como rascunho)
- Páginas-pilar: Sistemas sob demanda, Agentes de IA, Automação de processos, Alcance, Gestão. Cada uma com pelo menos 800 palavras úteis, FAQ e links internos.
- 10 posts de blog (lista no documento de diagnóstico), 900 a 1.500 palavras, com palavra-chave principal, título e descrição, imagem de capa com alt, links internos para as páginas-pilar e CTA. Tudo em rascunho para eu revisar. Nada de promessas falsas, números inventados ou comparações com concorrentes pelo nome.

## 2. Avaliações do Google (G10, parte do Gestão)
- Sincronização periódica (Celery) das avaliações do Perfil da Empresa no Google pela API oficial (Places), usando o ID do local e a chave de API em variáveis de ambiente (eu crio a chave). Guardar no Gestão, nunca chamar o Google no navegador do visitante.
- Respeitar as regras do Google: exibir o nome do autor, a nota, o texto e a atribuição "Avaliações do Google". Se a API entregar só algumas avaliações, mostrar as que vierem. Preencher o endpoint avaliacoes-google/ do contrato e o bloco avaliacoes_google.
- Não gerar dados estruturados de avaliação (AggregateRating) para o próprio site.

## 3. Medição e indexação
- GA4 e verificação do Search Console configurados pela tela Configurações do Gestão. Enviar o sitemap.xml no Search Console.
- Eventos: clique no WhatsApp, envio do formulário, clique em "Assinar" nos produtos.
- Checklist de lançamento em docs/checklist-seo.md: Perfil da Empresa no Google, backlinks iniciais (parceiros, clientes, diretórios), redes sociais apontando para o site, acompanhamento mensal das posições.

## 4. Entrega
Commits locais, sem push. Liste o que depende de mim (criar o Perfil da Empresa, a chave da API do Google, revisar e publicar os posts).
