const produtos = [
  { id: 1, nome: "Real Madrid I 2026/27", time: "Real Madrid", liga: "La Liga", cor: "Branco", ano: "2026/27", preco: 159.90, estoque: 18, icone: "👕", destaque: true },
  { id: 2, nome: "Barcelona I 2026/27", time: "Barcelona", liga: "La Liga", cor: "Azul", ano: "2026/27", preco: 159.90, estoque: 15, icone: "👕", destaque: true },
  { id: 3, nome: "Atlético de Madrid I 2026/27", time: "Atlético de Madrid", liga: "La Liga", cor: "Vermelho", ano: "2026/27", preco: 149.90, estoque: 11, icone: "👕" },

  { id: 4, nome: "Manchester City I 2026/27", time: "Manchester City", liga: "Premier League", cor: "Azul", ano: "2026/27", preco: 149.90, estoque: 12, icone: "👕", destaque: true },
  { id: 5, nome: "Liverpool I 2026/27", time: "Liverpool", liga: "Premier League", cor: "Vermelho", ano: "2026/27", preco: 149.90, estoque: 20, icone: "👕", destaque: true },
  { id: 6, nome: "Manchester United I 2026/27", time: "Manchester United", liga: "Premier League", cor: "Vermelho", ano: "2026/27", preco: 149.90, estoque: 9, icone: "👕" },
  { id: 7, nome: "Chelsea I 2026/27", time: "Chelsea", liga: "Premier League", cor: "Azul", ano: "2026/27", preco: 144.90, estoque: 14, icone: "👕" },
  { id: 8, nome: "Arsenal I 2026/27", time: "Arsenal", liga: "Premier League", cor: "Vermelho", ano: "2026/27", preco: 149.90, estoque: 13, icone: "👕" },

  { id: 9, nome: "PSG I 2026/27", time: "PSG", liga: "Ligue 1", cor: "Azul", ano: "2026/27", preco: 149.90, estoque: 17, icone: "👕", destaque: true },
  { id: 10, nome: "Marseille I 2026/27", time: "Marseille", liga: "Ligue 1", cor: "Branco", ano: "2026/27", preco: 139.90, estoque: 10, icone: "👕" },
  { id: 11, nome: "Lyon I 2026/27", time: "Lyon", liga: "Ligue 1", cor: "Branco", ano: "2026/27", preco: 139.90, estoque: 7, icone: "👕" },
  { id: 12, nome: "Monaco I 2026/27", time: "Monaco", liga: "Ligue 1", cor: "Vermelho", ano: "2026/27", preco: 139.90, estoque: 8, icone: "👕" },

  { id: 13, nome: "Flamengo I 2026", time: "Flamengo", liga: "Brasileirão", cor: "Vermelho", ano: "2026", preco: 139.90, estoque: 22, icone: "👕", destaque: true },
  { id: 14, nome: "Corinthians I 2026", time: "Corinthians", liga: "Brasileirão", cor: "Branco", ano: "2026", preco: 139.90, estoque: 19, icone: "👕", destaque: true },
  { id: 15, nome: "Palmeiras I 2026", time: "Palmeiras", liga: "Brasileirão", cor: "Verde", ano: "2026", preco: 139.90, estoque: 18, icone: "👕" },
  { id: 16, nome: "São Paulo I 2026", time: "São Paulo", liga: "Brasileirão", cor: "Branco", ano: "2026", preco: 139.90, estoque: 13, icone: "👕" },
  { id: 17, nome: "Grêmio I 2026", time: "Grêmio", liga: "Brasileirão", cor: "Azul", ano: "2026", preco: 134.90, estoque: 12, icone: "👕" },
  { id: 18, nome: "Internacional I 2026", time: "Internacional", liga: "Brasileirão", cor: "Vermelho", ano: "2026", preco: 134.90, estoque: 12, icone: "👕" },

  { id: 19, nome: "Bayern de Munique I 2026/27", time: "Bayern de Munique", liga: "Bundesliga", cor: "Vermelho", ano: "2026/27", preco: 154.90, estoque: 16, icone: "👕", destaque: true },
  { id: 20, nome: "Borussia Dortmund I 2026/27", time: "Borussia Dortmund", liga: "Bundesliga", cor: "Amarelo", ano: "2026/27", preco: 149.90, estoque: 11, icone: "👕" },

  { id: 21, nome: "Inter de Milão I 2026/27", time: "Inter de Milão", liga: "Serie A", cor: "Azul", ano: "2026/27", preco: 149.90, estoque: 13, icone: "👕" },
  { id: 22, nome: "Milan I 2026/27", time: "Milan", liga: "Serie A", cor: "Vermelho", ano: "2026/27", preco: 149.90, estoque: 14, icone: "👕" },
  { id: 23, nome: "Juventus I 2026/27", time: "Juventus", liga: "Serie A", cor: "Branco", ano: "2026/27", preco: 149.90, estoque: 10, icone: "👕" },

  { id: 24, nome: "Inter Miami I 2026", time: "Inter Miami", liga: "MLS", cor: "Rosa", ano: "2026", preco: 149.90, estoque: 20, icone: "👕", destaque: true },
  { id: 25, nome: "Al-Nassr I 2026", time: "Al-Nassr", liga: "Saudi Pro League", cor: "Amarelo", ano: "2026", preco: 144.90, estoque: 17, icone: "👕", destaque: true },
  { id: 26, nome: "Al-Hilal I 2026", time: "Al-Hilal", liga: "Saudi Pro League", cor: "Azul", ano: "2026", preco: 144.90, estoque: 12, icone: "👕" },

  { id: 27, nome: "Benfica I 2026/27", time: "Benfica", liga: "Liga Portugal", cor: "Vermelho", ano: "2026/27", preco: 139.90, estoque: 9, icone: "👕" },
  { id: 28, nome: "Porto I 2026/27", time: "Porto", liga: "Liga Portugal", cor: "Azul", ano: "2026/27", preco: 139.90, estoque: 8, icone: "👕" },

  { id: 29, nome: "Real Madrid Retrô 2002", time: "Real Madrid", liga: "Retrô", cor: "Branco", ano: "2002", preco: 189.90, estoque: 6, icone: "👕", destaque: true },
  { id: 30, nome: "Brasil Retrô 2002", time: "Brasil", liga: "Retrô", cor: "Amarelo", ano: "2002", preco: 199.90, estoque: 8, icone: "👕", destaque: true }
];

const tamanhos = ["P", "M", "G", "GG", "XG"];

let carrinho = JSON.parse(localStorage.getItem("futstyle-carrinho")) || [];
let favoritos = JSON.parse(localStorage.getItem("futstyle-favoritos")) || [];

const el = id => document.getElementById(id);

function moeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function valoresUnicos(campo) {
  return [...new Set(produtos.map(p => p[campo]))].sort((a, b) => String(a).localeCompare(String(b), "pt-BR"));
}

function preencherSelect(id, valores) {
  const select = el(id);
  valores.forEach(valor => {
    const option = document.createElement("option");
    option.value = valor;
    option.textContent = valor;
    select.appendChild(option);
  });
}

function siglaTime(nome) {
  const palavras = nome.split(/\s+/).filter(Boolean);
  if (palavras.length > 1) return palavras.slice(0, 2).map(palavra => palavra[0]).join("").toUpperCase();
  return nome.slice(0, 3).toUpperCase();
}

function camisaSVG(produto, aria = "") {
  return `
    <svg viewBox="0 0 260 300" role="img" aria-label="${aria || `Camisa ${produto.nome}`}" class="camisa-svg">
      <path class="camisa-corpo" d="M72 44 23 75l25 48 25-14v130h114V109l25 14 25-48-49-31-25 35H97L72 44Z" />
      <path class="camisa-gola" d="M98 43c4 22 60 22 64 0" />
      <path class="camisa-linha" d="M73 111h40m34 0h40M73 224h114" />
      <text class="camisa-numero" x="130" y="177" text-anchor="middle">${siglaTime(produto.time)}</text>
    </svg>
  `;
}

function coracaoSVG(ativo) {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" ${ativo ? 'fill="currentColor"' : ""} /></svg>`;
}

function iniciarFiltros() {
  preencherSelect("filtroLiga", valoresUnicos("liga"));
  preencherSelect("filtroTime", valoresUnicos("time"));
  preencherSelect("filtroCor", valoresUnicos("cor"));
  preencherSelect("filtroAno", valoresUnicos("ano"));
}

function produtoFavorito(id) {
  return favoritos.includes(id);
}

function renderProdutos(lista) {
  const area = el("listaProdutos");
  const semResultados = el("semResultados");

  if (!lista.length) {
    area.innerHTML = "";
    semResultados.classList.remove("oculto");
    el("resultadoInfo").textContent = "0 produtos";
    return;
  }

  semResultados.classList.add("oculto");
  el("resultadoInfo").textContent = `${lista.length} produto${lista.length > 1 ? "s" : ""}`;

  area.innerHTML = lista.map(p => `
    <article class="produto">
      <div class="produto-imagem">
        ${p.destaque ? '<span class="badge">DESTAQUE</span>' : ""}
        <button class="favorito-card ${produtoFavorito(p.id) ? "ativo" : ""}" onclick="alternarFavorito(${p.id})" aria-label="${produtoFavorito(p.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}">
          ${coracaoSVG(produtoFavorito(p.id))}
        </button>
        <div class="camisa-arte" data-cor="${p.cor}">${camisaSVG(p)}</div>
      </div>

      <div class="produto-info">
        <div class="produto-meta">${p.liga} · ${p.ano}</div>
        <h3>${p.nome}</h3>
        <div class="preco">${moeda(p.preco)}</div>
        <span class="estoque">${p.estoque} unidades disponíveis</span>

        <div class="acoes-produto">
          <button onclick="abrirProduto(${p.id})">Detalhes</button>
          <button class="comprar" onclick="adicionarCarrinho(${p.id})">Adicionar</button>
        </div>
      </div>
    </article>
  `).join("");
}

function aplicarFiltros() {
  const busca = el("filtroBusca").value.toLowerCase().trim();
  const liga = el("filtroLiga").value;
  const time = el("filtroTime").value;
  const cor = el("filtroCor").value;
  const ano = el("filtroAno").value;
  const precoMax = Number(el("filtroPreco").value);
  const ordem = el("ordenacao").value;

  let lista = produtos.filter(p => {
    const bateBusca = !busca || [p.nome, p.time, p.liga].some(v => v.toLowerCase().includes(busca));
    return bateBusca &&
      (!liga || p.liga === liga) &&
      (!time || p.time === time) &&
      (!cor || p.cor === cor) &&
      (!ano || p.ano === ano) &&
      p.preco <= precoMax;
  });

  if (ordem === "menor-preco") lista.sort((a, b) => a.preco - b.preco);
  if (ordem === "maior-preco") lista.sort((a, b) => b.preco - a.preco);
  if (ordem === "nome") lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  if (ordem === "relevancia") lista.sort((a, b) => Number(b.destaque) - Number(a.destaque));

  renderProdutos(lista);
}

function limparFiltros() {
  el("filtroBusca").value = "";
  el("filtroLiga").value = "";
  el("filtroTime").value = "";
  el("filtroCor").value = "";
  el("filtroAno").value = "";
  el("filtroPreco").value = 250;
  el("ordenacao").value = "relevancia";
  atualizarPrecoRange();
  aplicarFiltros();
}

function atualizarPrecoRange() {
  el("valorPreco").textContent = `Até ${moeda(Number(el("filtroPreco").value))}`;
}

function renderLigas() {
  const ligas = valoresUnicos("liga");
  el("listaLigas").innerHTML = ligas.map(liga =>
    `<button class="liga-chip" onclick="filtrarPorLiga('${liga.replace(/'/g, "\\'")}')">${liga}</button>`
  ).join("");
}

function filtrarPorLiga(liga) {
  el("filtroLiga").value = liga;
  aplicarFiltros();
  el("catalogo").scrollIntoView({ behavior: "smooth" });
}

function salvar() {
  localStorage.setItem("futstyle-carrinho", JSON.stringify(carrinho));
  localStorage.setItem("futstyle-favoritos", JSON.stringify(favoritos));
}

function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const item = carrinho.find(i => i.id === id);

  if (item) item.qtd++;
  else carrinho.push({ id, qtd: 1 });

  salvar();
  renderCarrinho();
  abrirPainel("carrinho");
}

function removerCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  salvar();
  renderCarrinho();
}

function renderCarrinho() {
  const area = el("itensCarrinho");
  const qtd = carrinho.reduce((total, item) => total + item.qtd, 0);

  el("qtdCarrinho").textContent = qtd;

  if (!carrinho.length) {
    area.innerHTML = "<p>Seu carrinho está vazio.</p>";
    el("totalCarrinho").textContent = moeda(0);
    return;
  }

  area.innerHTML = carrinho.map(item => {
    const produto = produtos.find(p => p.id === item.id);
    return `
      <div class="item-painel">
        <div>
          <strong>${produto.nome}</strong>
          <p>${item.qtd} × ${moeda(produto.preco)}</p>
        </div>
        <button onclick="removerCarrinho(${item.id})">Remover</button>
      </div>
    `;
  }).join("");

  const total = carrinho.reduce((soma, item) => {
    const produto = produtos.find(p => p.id === item.id);
    return soma + produto.preco * item.qtd;
  }, 0);

  el("totalCarrinho").textContent = moeda(total);
}

function alternarFavorito(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(itemId => itemId !== id);
  } else {
    favoritos.push(id);
  }

  salvar();
  renderFavoritos();
  aplicarFiltros();
}

function renderFavoritos() {
  el("qtdFavoritos").textContent = favoritos.length;

  if (!favoritos.length) {
    el("itensFavoritos").innerHTML = "<p>Você ainda não adicionou favoritos.</p>";
    return;
  }

  el("itensFavoritos").innerHTML = favoritos.map(id => {
    const produto = produtos.find(p => p.id === id);
    return `
      <div class="item-painel">
        <div>
          <strong>${produto.nome}</strong>
          <p>${moeda(produto.preco)}</p>
        </div>
        <button onclick="alternarFavorito(${id})">Remover</button>
      </div>
    `;
  }).join("");
}

function abrirPainel(tipo) {
  const painel = tipo === "carrinho" ? el("painelCarrinho") : el("painelFavoritos");

  el("painelCarrinho").classList.remove("aberto");
  el("painelFavoritos").classList.remove("aberto");
  el("painelCarrinho").setAttribute("aria-hidden", "true");
  el("painelFavoritos").setAttribute("aria-hidden", "true");

  painel.classList.add("aberto");
  painel.setAttribute("aria-hidden", "false");
  el("overlay").classList.add("ativo");
}

function fecharPaineis() {
  el("painelCarrinho").classList.remove("aberto");
  el("painelFavoritos").classList.remove("aberto");
  el("painelCarrinho").setAttribute("aria-hidden", "true");
  el("painelFavoritos").setAttribute("aria-hidden", "true");
  el("overlay").classList.remove("ativo");
}

function abrirProduto(id) {
  const p = produtos.find(produto => produto.id === id);

  el("conteudoModal").innerHTML = `
    <div class="modal-produto">
      <div class="modal-imagem"><div class="camisa-arte" data-cor="${p.cor}">${camisaSVG(p)}</div></div>
      <div>
        <span class="eyebrow">${p.liga}</span>
        <h2>${p.nome}</h2>
        <div class="preco">${moeda(p.preco)}</div>
        <p class="modal-detalhes">
          Time: ${p.time}<br>
          Cor principal: ${p.cor}<br>
          Ano: ${p.ano}<br>
          Estoque: ${p.estoque} unidades
        </p>

        <strong>Tamanhos disponíveis</strong>
        <div class="tamanhos">
          ${tamanhos.map(t => `<button class="tamanho">${t}</button>`).join("")}
        </div>

        <button class="btn btn-principal" onclick="adicionarCarrinho(${p.id}); fecharModalProduto();">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  `;

  el("modalProduto").classList.add("aberto");
}

function fecharModalProduto() {
  el("modalProduto").classList.remove("aberto");
}

["filtroBusca", "filtroLiga", "filtroTime", "filtroCor", "filtroAno", "ordenacao"].forEach(id => {
  el(id).addEventListener("input", aplicarFiltros);
});

el("filtroPreco").addEventListener("input", () => {
  atualizarPrecoRange();
  aplicarFiltros();
});

el("limparFiltros").addEventListener("click", limparFiltros);
el("btnCarrinho").addEventListener("click", () => abrirPainel("carrinho"));
el("btnFavoritos").addEventListener("click", () => abrirPainel("favoritos"));
el("overlay").addEventListener("click", fecharPaineis);

document.querySelectorAll(".fechar-painel").forEach(btn => {
  btn.addEventListener("click", fecharPaineis);
});

el("fecharModal").addEventListener("click", fecharModalProduto);
el("modalProduto").addEventListener("click", e => {
  if (e.target === el("modalProduto")) fecharModalProduto();
});

el("btnMenu").addEventListener("click", () => {
  const aberto = el("menuPrincipal").classList.toggle("aberto");
  el("btnMenu").setAttribute("aria-expanded", String(aberto));
  el("btnMenu").setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll("#menuPrincipal a").forEach(link => {
  link.addEventListener("click", () => {
    el("menuPrincipal").classList.remove("aberto");
    el("btnMenu").setAttribute("aria-expanded", "false");
    el("btnMenu").setAttribute("aria-label", "Abrir menu");
  });
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  fecharPaineis();
  fecharModalProduto();
});

iniciarFiltros();
renderLigas();
atualizarPrecoRange();
renderProdutos(produtos);
renderCarrinho();
renderFavoritos();
