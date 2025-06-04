# FutStyle

Projeto front-end de uma loja de camisas de futebol.

## Arquivos principais
- `index.html`
- `style.css`
- `script.js`

## O que já funciona
- Catálogo de produtos
- Busca
- Filtros por liga, time, cor, ano e preço
- Ordenação
- Carrinho
- Favoritos
- Modal de detalhes
- Responsividade
- LocalStorage para manter carrinho e favoritos
- Estrutura simples para futura integração com backend

## Como abrir
Abra o arquivo `index.html` no navegador.

## Estrutura preparada para backend
Atualmente os produtos ficam no array `produtos` dentro de `script.js`.
No futuro, ele pode ser substituído por dados recebidos de uma API/backend.

Exemplo:
```js
fetch("http://localhost:3000/produtos")
  .then(res => res.json())
  .then(produtos => renderProdutos(produtos));
```

## Sugestão de commits
1. `chore: inicia projeto FutStyle`
2. `feat: adiciona estrutura principal da loja`
3. `style: adiciona identidade visual e responsividade`
4. `feat: adiciona catálogo de camisas`
5. `feat: adiciona filtros e busca`
6. `feat: implementa carrinho`
7. `feat: implementa favoritos e detalhes`
8. `refactor: prepara estrutura para backend`
