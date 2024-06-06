import { handleProductSelected } from './cart.js';

export async function addEventListeners(cart) {
	document.querySelectorAll('.product-card').forEach(function (item) {
		item.addEventListener('click', async (e) => {
			let productId = e.target.attributes['data-id'].value;
			console.log(`productId:`, productId);
			await handleProductSelected(productId, cart);
		});
	});

	const hamburger = document.querySelector('.hamburger');
	const nav = document.querySelector('.nav');

	hamburger.addEventListener('click', () => nav.classList.toggle('active'));

	document
		.querySelector('.btn-purchase')
		.addEventListener('click', async (e) => {
			alert('Em construçao...');
		});
}
