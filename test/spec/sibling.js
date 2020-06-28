describe('$.sibling', () => {
	const inputHTML =
		'<div id="item1" class="item1"></div><div class="item2"></div><div class="item3"></div>';
	const expectedHTML = '<div class="item2"></div><div class="item3"></div>';

	it('should throw an error if the elements aren\'t found via the "elemint" object', () => {
		document.body.innerHTML = inputHTML;
		let nodes = document.getElementById('item1');
		nodes = $.sibling(nodes);
		document.body.innerHTML = nodes[0].outerHTML + nodes[1].outerHTML;
		expect(document.body.innerHTML).eql(expectedHTML);
	});

	it('should throw an error if the elements aren\'t found via the "elemint" function', () => {
		document.body.innerHTML = inputHTML;
		let nodes = document.getElementById('item1');
		nodes = $(nodes).sibling();
		document.body.innerHTML = nodes.$[0].outerHTML + nodes.$[1].outerHTML;
		expect(document.body.innerHTML).eql(expectedHTML);
	});
});

describe('$.sibling w/ selector', () => {
	const inputHTML =
		'<div id="item1" class="item1"></div><div class="item2"></div><div class="item3"></div>';
	const expectedHTML = '<div class="item2"></div><div class="item3"></div>';

	it('should throw an error if the elements aren\'t found via the "elemint" object', () => {
		document.body.innerHTML = inputHTML;
		let nodes = [].slice.call(document.body.childNodes);
		nodes = $.sibling(nodes, '.item');
		document.body.innerHTML = nodes[0].outerHTML + nodes[1].outerHTML;
		expect(document.body.innerHTML).eql(expectedHTML);
	});

	it('should throw an error if the elements aren\'t found via the "elemint" function', () => {
		document.body.innerHTML = inputHTML;
		let nodes = [].slice.call(document.body.childNodes);
		nodes = $(nodes).sibling('.item1');
		document.body.innerHTML = nodes.$[0].outerHTML + nodes.$[1].outerHTML;
		expect(document.body.innerHTML).eql(expectedHTML);
	});
});
