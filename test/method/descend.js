describe('$.descend', () => {
	it('should throw an error if the elements aren\'t found', () => {
		const html = '<div><div><div class="item"></div></div></div><div><div><div class="item"></div></div></div>';
		document.body.innerHTML = html;
		let nodes = toArray(document.body.childNodes);
		nodes = $.descend(nodes, '.item');
		document.body.innerHTML = nodes[0].outerHTML + nodes[1].outerHTML;
		expect(document.body.innerHTML).eql('<div class="item"></div><div class="item"></div>');
	});
});
