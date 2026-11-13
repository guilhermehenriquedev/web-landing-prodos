// Lighthouse mobile (preset padrão: Moto G Power com 4G lento) nas rotas principais.
// Uso: BASE=http://localhost:3000 CHROME_PATH=/caminho/do/chrome node scripts/lighthouse.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const base = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const saida = process.env.SAIDA ?? "docs/execucao/s1/lighthouse";
const rotas = (process.env.ROTAS ?? "/,/produtos/alcance,/servicos/sistemas-sob-medida,/blog,/blog/campanhas-no-whatsapp-sem-perder-clientes,/contato").split(",");
mkdirSync(saida, { recursive: true });

const linhas = [];
for (const rota of rotas) {
  const nome = rota === "/" ? "inicio" : rota.slice(1).replace(/\//g, "_");
  const arquivo = `${saida}/${nome}.json`;
  execFileSync("npx", ["--yes", "lighthouse@13.5.0", base + rota, "--quiet", "--output=json", `--output-path=${arquivo}`, "--chrome-flags=--headless=new --no-sandbox", "--only-categories=performance,accessibility,best-practices,seo"], { stdio: "inherit" });
  const r = JSON.parse(readFileSync(arquivo, "utf8"));
  const nota = (c) => Math.round(r.categories[c].score * 100);
  linhas.push({
    rota,
    desempenho: nota("performance"),
    acessibilidade: nota("accessibility"),
    boasPraticas: nota("best-practices"),
    seo: nota("seo"),
    lcp: r.audits["largest-contentful-paint"].displayValue,
    cls: r.audits["cumulative-layout-shift"].displayValue,
    tbt: r.audits["total-blocking-time"].displayValue,
  });
}
console.table(linhas);
