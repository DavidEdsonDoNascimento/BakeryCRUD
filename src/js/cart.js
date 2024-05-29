import { getProducts } from './product.js';
import { getPriceFormated } from './formatter.js';

async function getCart() {
	console.log(`getCart:`, cart);
	return cart;
}

function setCart(cartData) {
	cart = cartData;
}

/** removendo todos os li para recriar os itens do carrinho */
function cleanCart(ul) {
	ul.innerHTML = '';
	console.log(ul);
}

/** Quando selecionar deve ir para o carrinho */
export async function handleProductSelected(id) {
	let products = await getProducts();
	let p = products.find((product) => product.id === +id);
	await addCart(p);
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

	cleanCart(ul);

	let cart = await getCart();

	for (const item of cart) {
		let li = document.createElement('li');
		li.innerHTML = createProductInCartHtml(item);
		ul.appendChild(li);
	}

	ul.appendChild(await createTotalPurchase());
	console.log(`buildCart:`, ul);
}
async function createTotalPurchase() {
	let totalPurchase = document.createElement('span');
    totalPurchase.setAttribute('class', 'totalPurchase');
	totalPurchase.innerHTML = `TOTAL: R$${getPriceFormated(
		await getTotalPrice()
	)}`;
	return totalPurchase;
}

async function getTotalPrice() {
	let items = await getCart();
	let total = items.reduce((acc, item) => {
		return (acc += item.price * item.qttAtPurchase);
	}, 0);
	console.log(`getTotalPrice:`, total);
	return total;
}

function createProductInCartHtml(item) {
	return `${item.name} | Preço: R$${getPriceFormated(
		+item.price * +item.qttAtPurchase
	)} | Quantidade: ${item.qttAtPurchase}`;
}
