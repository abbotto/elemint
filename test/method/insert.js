describe('$.insert w/ element', () => {
	it('should throw an error if the element wasn\'t inserted', () => {
		document.body.innerHTML = '';
		const p = document.createElement('p');
		p.innerHTML = 'hola';
		$.insert(document.body, p);
		expect(document.body.innerHTML).eql('<p>hola</p>');
	});
});

describe('$.insert w/ html', () => {
	it('should throw an error if the html wasn\'t inserted', () => {
		document.body.innerHTML = '';
		$.insert(document.body, '<div>hola</div>');
		expect(document.body.innerHTML).eql('<div>hola</div>');
	});
});
