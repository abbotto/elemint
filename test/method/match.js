describe('$.match', () => {
	it('should throw an error if the elements aren\'t properly matched via the "elemint" object', () => {
		const html = '<div></div><div class="item"></div><div></div><div class="item"></div>';
		document.body.innerHTML = html;

		const matchedNodes = $.match(
			toArray(document.body.childNodes),
			el => (el.className === 'item')
		);

		document.body.innerHTML = matchedNodes[0].outerHTML + matchedNodes[1].outerHTML;
		expect(document.body.innerHTML).eql('<div class="item"></div><div class="item"></div>');
	});

	it('should throw an error if the elements aren\'t properly matched via the "elemint" function', () => {
		const html = '<div></div><div class="item"></div><div></div><div class="item"></div>';
		document.body.innerHTML = html;

		const matchedNodes = $(document.body.childNodes).match(
			el => (el.className === 'item')
		);

		document.body.innerHTML = matchedNodes.$[0].outerHTML + matchedNodes.$[1].outerHTML;
		expect(document.body.innerHTML).eql('<div class="item"></div><div class="item"></div>');
	});
});
