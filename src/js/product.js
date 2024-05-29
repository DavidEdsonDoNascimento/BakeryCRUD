import { getPriceFormated } from './formatter.js';

export function createProductDetailsHtml(product) {
	return `
                <p class='product-name' data-id='${product.id}'>${
		product.name
	}</p>
                <p class='product-price' data-id='${
									product.id
								}'>R$${getPriceFormated(product.price)}</p>
    `;
}

export function createProductsTable(productsData) {
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

/** Retorna um array de produtos mockados */
export async function getProducts() {
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
		{
			id: 6,
			name: 'Escova de dentes macia',
			price: 14.99,
			qtt: 11,
			status: true,
		},
		{
			id: 7,
			name: 'Pasta de dentes colgate',
			price: 3.99,
			qtt: 17,
			status: true,
		},
	];
}
