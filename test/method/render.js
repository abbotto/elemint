describe('$.render - String -> Element(s)', () => {
	it('should throw an error if elements aren\'t returned', () => {
		const html = '<div>hello world</div><div>howdy</div>';
		expect($.render(html)[0].outerHTML).eql('<div>hello world</div>');
		expect($.render(html)[1].outerHTML).eql('<div>howdy</div>');
	});
});
