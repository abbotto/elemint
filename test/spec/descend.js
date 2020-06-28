describe('$.descend', () => {
	const html =
		'<section><span><div class="item"><div class="sub-item-1"></div></div></span></section>' +
		'<section><span><div class="item"><div class="sub-item-2"></div></div></span></section>';

	it('should throw an error if all the elements ancestors aren\'t found via the "elemint" object', () => {
		document.body.innerHTML = html;
		let nodes = $.query('section');
		nodes = $.descend(nodes);
		document.body.innerHTML = nodes[0].outerHTML + nodes[1].outerHTML;
		expect(document.body.innerHTML).eql(html);
	});

	it('should throw an error if all the elements ancestors aren\'t found via the "elemint" function', () => {
		document.body.innerHTML = html;
		const nodes = $('section').descend();
		document.body.innerHTML = nodes.$[0].outerHTML + nodes.$[1].outerHTML;
		expect(document.body.innerHTML).eql(html);
	});

	it('should throw an error if the elements selected ancestors aren\'t found via the "elemint" object', () => {
		const newHtml =
			html +
			'<section><span><div class="item"><div class="sub-item-2"></div></div></span></section>';
		document.body.innerHTML = newHtml;
		nodes = $.descend(document.body, '.sub-item-2');
		document.body.innerHTML = nodes[0].outerHTML;
		expect(document.body.innerHTML).eql('<div class="sub-item-2"></div>');
	});

	it('should throw an error if the elements selected ancestors aren\'t found via the "elemint" function', () => {
		const newHtml =
			html +
			'<section><span><div class="item"><div class="sub-item-2"></div></div></span></section>';
		document.body.innerHTML = newHtml;
		nodes = $('body').descend('.sub-item-2');
		document.body.innerHTML = nodes.$[0].outerHTML;
		expect(document.body.innerHTML).eql('<div class="sub-item-2"></div>');
	});

	it('should throw an error if the elements selected ancestors aren\'t found at the specified depth via the "elemint" object', () => {
		const newHtmlA =
			'<div class="item A1"><div class="item A2"><div class="item A3"><div class="item A4"></div></div></div></div>';
		const newHtmlB =
			'<div class="item B1"><div class="item B2"><div class="item B3"><div class="item B4"></div></div></div></div>';
		document.body.innerHTML = newHtmlA + newHtmlB;
		nodes = $.descend(document.body, '.item', 2);

		document.body.innerHTML =
			nodes[0].outerHTML +
			nodes[1].outerHTML +
			nodes[2].outerHTML +
			nodes[3].outerHTML;

		expect(document.body.innerHTML).eql(
			newHtmlA +
				'<div class="item A2"><div class="item A3"><div class="item A4"></div></div></div>' +
				newHtmlB +
				'<div class="item B2"><div class="item B3"><div class="item B4"></div></div></div>'
		);
	});

	it('should throw an error if the elements selected ancestors aren\'t found at the specified depth via the "elemint" function', () => {
		const newHtmlA =
			'<div class="item A1"><div class="item A2"><div class="item A3"><div class="item A4"></div></div></div></div>';
		const newHtmlB =
			'<div class="item B1"><div class="item B2"><div class="item B3"><div class="item B4"></div></div></div></div>';
		document.body.innerHTML = newHtmlA + newHtmlB;
		nodes = $('body').descend('.item', 2);

		document.body.innerHTML =
			nodes.$[0].outerHTML +
			nodes.$[1].outerHTML +
			nodes.$[2].outerHTML +
			nodes.$[3].outerHTML;

		expect(document.body.innerHTML).eql(
			newHtmlA +
				'<div class="item A2"><div class="item A3"><div class="item A4"></div></div></div>' +
				newHtmlB +
				'<div class="item B2"><div class="item B3"><div class="item B4"></div></div></div>'
		);
	});
});
