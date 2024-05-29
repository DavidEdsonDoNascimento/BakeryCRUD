import { getProducts, createProductsTable } from './product.js';
import { addEventListeners } from './events.js';

globalThis.cart = [];
window.onload = async () => {
	let produtos = await getProducts();
	createProductsTable(produtos);
	await addEventListeners();
};
