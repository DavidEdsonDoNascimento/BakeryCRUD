export function getPriceFormated(price) {
	return Number(price).toFixed(2).toString().replace('.', ',');
}