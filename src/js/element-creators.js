function createButton(text, attrClass, callback) {
	let btn = document.createElement('button');
	btn.setAttribute('class', attrClass);
	let btnTxt = document.createTextNode(text);
	btn.appendChild(btnTxt);
	btn.onclick = callback;
	document.body.appendChild(btn);
}
