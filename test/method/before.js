describe('$.before', () => {
	it('should throw an error if the element isn\'t returned', () => {
		document.body.innerHTML = '<span>hola</span><p>hola</p>';
		const p = document.querySelectorAll('p');
		expect($.before(p)[0].outerHTML).eql('<span>hola</span>');
	});
});

describe('$.before w/ selector', () => {
	it('should throw an error if the element isn\'t returned', () => {
		document.body.innerHTML = '<span id="one">1</span><span id="two">2</span><span id="three">3</span><p>hola</p>';
		const p = document.querySelectorAll('p');
		expect($.before(p, '#one')[0].outerHTML).eql('<span id="one">1</span>');
	});
});
