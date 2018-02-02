describe('$.render - String -> Element(s)', () => {
	it('should throw an error if elements aren\'t returned', () => {
		const html = '<div>hola</div><div>howdy</div>';
		expect($.render(html)[0].outerHTML).eql('<div>hola</div>');
		expect($.render(html)[1].outerHTML).eql('<div>howdy</div>');
	});
});
