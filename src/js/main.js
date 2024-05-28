var cart = [];
window.onload = async () => {
	cart = [];

	let produtos = await getProducts();
	createProductsTable(produtos);

	document.querySelectorAll('.product-card').forEach(function (item) {
		item.addEventListener('click', async (e) => {
			let productId = e.target.attributes['data-id'].value;
			console.log(`productId:`, productId);
			await handleProductSelected(productId);
		});
	});
};

function createProductsTable(productsData) {
	// elemento ul relativo aos produtos no HTML
	let ul = document.getElementById('products');

	// criando elemento li
	for (const product of productsData) {
		let li = document.createElement('li');
		li.setAttribute('class', 'product-card');
		li.setAttribute('data-id', product.id);
		li.innerHTML = createProductDetailsHtml(product);
		ul.appendChild(li);
	}
}

/** Quando selecionar deve ir para o carrinho */
async function handleProductSelected(id) {
	let products = await getProducts();
	let p = products.find((product) => product.id === +id);
	await addCart(p);
}

async function getCart() {
	return cart;
}

function setCart(cartData) {
	cart = cartData;
}

async function addCart(product) {
	let currentCart = [...(await getCart())];
	let itemP = currentCart.find((c) => c.id === product.id);
	let itemIndex = currentCart.findIndex((c) => c.id === product.id);
	if (itemIndex >= 0) {
		currentCart.splice(itemIndex, 1);
	}
	currentCart.push({
		...product,
		qttAtPurchase: (!itemP?.qttAtPurchase ? 0 : itemP.qttAtPurchase) + 1,
	});
	setCart(currentCart);
	await buildCart();
}

/** Constroi o carrinho */
async function buildCart() {
	let ul = document.getElementById('cart');
	// removendo todos os li para recriar os itens do carrinho
	ul.innerHTML = '';
	console.log(ul);
	let cart = await getCart();
	console.log(`getCart:`, cart);
	for (const item of cart) {
		let li = document.createElement('li');
		li.innerHTML = createProductInCartHtml(item);
		ul.appendChild(li);
	}
	console.log(`getCart:`, ul);
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
async function getProducts() {
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
