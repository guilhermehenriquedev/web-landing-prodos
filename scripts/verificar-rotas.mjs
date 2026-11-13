// Percorre o sitemap e as páginas que ele não lista (tags, 404) e confere o básico de SEO.
// Uso: BASE=http://localhost:3000 node scripts/verificar-rotas.mjs
const base = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const TIPOS_JSONLD = { "/": ["Organization", "WebSite"], "/blog/": ["BlogPosting", "BreadcrumbList"], "/produtos/": ["SoftwareApplication"] };

const problemas = [];
const linksVistos = new Map();

function achar(html, regex) {
  return [...html.matchAll(regex)].map((m) => m[1]);
}

async function pagina(caminho) {
  const resposta = await fetch(base + caminho, { redirect: "manual" });
  return { status: resposta.status, html: resposta.status === 200 ? await resposta.text() : "", local: resposta.headers.get("location") };
}

function conferir(caminho, html) {
  const erros = [];
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) erros.push(`${h1} H1`);
  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!titulo) erros.push("sem title");
  const descricao = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!descricao) erros.push("sem description");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) erros.push("sem canonical");
  if (!/<html lang="pt-BR"/.test(html)) erros.push("sem lang pt-BR");

  const blocos = achar(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  const tipos = [];
  for (const bloco of blocos) {
    try {
      const dados = JSON.parse(bloco);
      for (const item of [dados].flat()) {
        if (item["@context"] !== "https://schema.org") erros.push(`JSON-LD sem @context (${item["@type"]})`);
        tipos.push(item["@type"]);
      }
    } catch {
      erros.push("JSON-LD inválido");
    }
  }
  for (const [prefixo, esperados] of Object.entries(TIPOS_JSONLD)) {
    const aplica = prefixo === "/" || (caminho.startsWith(prefixo) && caminho.split("/").length === 3 && !caminho.includes("/pagina"));
    for (const tipo of esperados) if (aplica && !tipos.includes(tipo)) erros.push(`falta JSON-LD ${tipo}`);
  }
  if (html.includes("FAQPage") === false && /<details>/.test(html) && caminho !== "/blog") erros.push("FAQ sem FAQPage");
  if (/AggregateRating|"Review"/.test(html)) erros.push("avaliação própria em JSON-LD");

  for (const href of achar(html, /<a [^>]*href="(\/[^"#?]*)/g)) {
    if (!linksVistos.has(href)) linksVistos.set(href, caminho);
  }
  return { erros, titulo, descricao, canonical, tipos: [...new Set(tipos)], h1 };
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const rotas = achar(sitemap, /<loc>([^<]+)<\/loc>/g).map((url) => new URL(url).pathname);
const tags = achar(await (await fetch(`${base}/blog`)).text(), /href="(\/blog\/tag\/[^"]+)"/g);
const extras = [...new Set(["/blog/tag/whatsapp", ...tags])].slice(0, 3);

console.log(`Sitemap: ${rotas.length} URLs\n`);
for (const caminho of [...rotas, ...extras]) {
  const { status, html } = await pagina(caminho);
  if (status !== 200) {
    problemas.push(`${caminho}: HTTP ${status}`);
    console.log(`✗ ${caminho} HTTP ${status}`);
    continue;
  }
  const r = conferir(caminho, html);
  r.erros.forEach((erro) => problemas.push(`${caminho}: ${erro}`));
  console.log(`${r.erros.length ? "✗" : "✓"} ${caminho}  [${r.titulo?.length ?? 0}c título, ${r.descricao?.length ?? 0}c descrição, JSON-LD: ${r.tipos.join(", ")}]${r.erros.length ? `  ${r.erros.join("; ")}` : ""}`);
}

console.log(`\nLinks internos únicos: ${linksVistos.size}`);
for (const [href, origem] of linksVistos) {
  const { status, local } = await pagina(href);
  const ok = status === 200 || (status === 308 && local) || status === 301;
  if (!ok) problemas.push(`link quebrado ${href} (em ${origem}): HTTP ${status}`);
}

const naoExiste = await pagina("/esta-pagina-nao-existe");
if (naoExiste.status !== 404) problemas.push(`404 própria respondeu ${naoExiste.status}`);
const robots = await (await fetch(`${base}/robots.txt`)).text();
if (!robots.includes("Sitemap:")) problemas.push("robots.txt sem Sitemap");

console.log(problemas.length ? `\n${problemas.length} problema(s):\n- ${problemas.join("\n- ")}` : "\nTudo certo: status 200, um H1, title, description, canonical, JSON-LD e nenhum link interno quebrado.");
process.exit(problemas.length ? 1 : 0);
