describe('$.parent', () => {
	it('should throw an error if the parent isn\'t returned', () => {
		document.body.innerHTML = '<div><p>hola</p></div>';
		const p = document.querySelectorAll('p');
		expect($.parent(p)[0].outerHTML).eql('<div><p>hola</p></div>');
	});
});
