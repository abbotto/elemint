describe('$.after', () => {
	it('should throw an error if the element isn\'t returned', () => {
		document.body.innerHTML = '<p>hola</p><span>hola</span>';
		const p = document.querySelectorAll('p');
		expect($.after(p)[0].outerHTML).eql('<span>hola</span>');
	});
});

describe('$.after w/ selector', () => {
	it('should throw an error if the element isn\'t returned', () => {
		document.body.innerHTML = '<p>hola</p><span id="one">1</span><span id="two">2</span><span id="three">3</span>';
		const p = document.querySelector('p');
		expect($.after(p, '#three')[0].outerHTML).eql('<span id="three">3</span>');
	});
});
