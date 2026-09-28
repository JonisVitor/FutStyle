// O catálogo agora vem do banco de dados (PostgreSQL) através da API Express.
// A lista começa vazia e é preenchida em carregarProdutos().
let produtos = [];

const API = "";  // mesma origem do servidor Express

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

  // remove do carrinho itens que não existem mais no banco
  carrinho = carrinho.filter(item => produtos.some(p => p.id === item.id));
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
  // remove favoritos que não existem mais no banco
  favoritos = favoritos.filter(id => produtos.some(p => p.id === id));
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

// ---------------------------------------------------------------
// Carregamento dos dados vindos do banco
// ---------------------------------------------------------------
async function carregarProdutos() {
  const area = el("listaProdutos");
  area.innerHTML = '<p class="carregando">Carregando camisas do banco de dados...</p>';

  try {
    const resposta = await fetch(`${API}/camisa`);
    if (!resposta.ok) throw new Error("Falha na requisição");

    const dados = await resposta.json();

    // adapta os campos do banco para o formato usado pela tela
    produtos = dados.map(c => ({
      id: c.id,
      nome: c.nome,
      time: c.time,
      liga: c.liga,
      cor: c.cor,
      ano: c.ano,
      preco: Number(c.preco),
      estoque: c.estoque,
      destaque: c.destaque,
      icone: "👕"
    }));

    iniciarFiltros();
    renderLigas();
    atualizarPrecoRange();
    aplicarFiltros();
    renderCarrinho();
    renderFavoritos();
  } catch (erro) {
    console.error(erro);
    area.innerHTML = '<p class="carregando">Não foi possível carregar o catálogo. Verifique se o servidor e o banco estão no ar.</p>';
    el("resultadoInfo").textContent = "";
  }
}

carregarProdutos();
