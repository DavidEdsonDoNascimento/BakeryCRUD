var cart = [];
window.onload = () => {
	cart = [];
	let produtos = getProducts();
	createProductsTable(produtos);
};

function createProductsTable(productsData) {
	// elemento ul relativo aos produtos no HTML
	let ul = document.getElementById('products');

	// criando elemento li
	for (const product of productsData) {
		let li = document.createElement('li');
		li.setAttribute('class', 'product-card');
		li.setAttribute('onclick', `getProductSelected(${product.id})`);
		li.innerHTML = createProductDetailsHtml(product);
		ul.appendChild(li);
	}
}

/** Quando selecionar deve ir para o carrinho */
function getProductSelected(id) {
	let products = getProducts();
	let p = products.find((product) => product.id === id);
	addCart(p);
}

function getCart() {
	return cart;
}

function setCart(cartData) {
	cart = cartData;
}

function addCart(product) {
	let currentCart = getCart();
	let itemP = currentCart.find((c) => c.id === product.id);

	if (!itemP?.id) {
		currentCart.push({ ...product, qttAtPurchase: 1 });
        setCart(currentCart);
        buildCart();
        return;
	}
}

function buildCart() {
    let ul = document.getElementById('cart');
    let cart = getCart();
    for (const item of cart) {
        let li = document.createElement('li');
        li.innerHTML = createProductInCartHtml(item);
		ul.appendChild(li);
    }
}
function createProductInCartHtml(item) {
    return `Produto: ${item.name} | Quantidade: ${item.qttAtPurchase}`;
}

function createProductDetailsHtml(product) {
	return `
                <p class='product-name'>${product.name}</p>
                <p class='product-price'>R$${getPriceFormated(
									product.price
								)}</p>
    `;
}

function getPriceFormated(price) {
	return price.toFixed(2).toString().replace('.', ',');
}

/** Retorna um array de produtos mockados */
function getProducts() {
	return [
		{
			id: 1,
			name: 'Bolacha trakinas',
			price: 3.99,
			qtt: 20,
			status: true,
		},
		{
			id: 2,
			name: 'pao de queijo 1kg',
			price: 19.9,
			qtt: 5,
			status: true,
		},
		{
			id: 3,
			name: 'Café melita 500G',
			price: 12.99,
			qtt: 10,
			status: true,
		},
		{
			id: 4,
			name: 'Papel Higienico Paloma 12Rolos',
			price: 22.99,
			qtt: 7,
			status: true,
		},
		{
			id: 5,
			name: 'Refrigerante Coca-Cola 2L',
			price: 11.99,
			qtt: 8,
			status: true,
		},
	];
}
