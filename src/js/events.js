import { handleProductSelected } from './cart.js';

export async function addEventListeners(cart) {
	document.querySelectorAll('.product-card').forEach(function (item) {
		item.addEventListener('click', async (e) => {
			console.log(e);
            console.log('voi:', cart);
			let productId = e.target.attributes['data-id'].value;
			console.log(`productId:`, productId);
			await handleProductSelected(productId, cart);
		});
	});

	document
		.querySelector('.btn-purchase')
		.addEventListener('click', async (e) => {
			alert('Em construçao...');
		});
}
