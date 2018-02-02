describe('$.mount an element relative to the target element', () => {
	it('should throw an error if the element wasn\'t mounted via the "elemint" object', () => {
		document.body.innerHTML = '';
		const p = document.createElement('p');
		p.innerHTML = 'hello world';
		$.mount(document.body, p);
		expect(document.body.innerHTML).eql('<p>hello world</p>');
	});

	it('should throw an error if the element wasn\'t mounted via the "elemint" function', () => {
		document.body.innerHTML = '';
		const p = document.createElement('p');
		p.innerHTML = 'hello world';
		$(document.body).mount(p);
		expect(document.body.innerHTML).eql('<p>hello world</p>');
	});
});

describe('$.mount html relative to the target element', () => {
	it('should throw an error if the html wasn\'t mounted via the "elemint" object', () => {
		document.body.innerHTML = '';
		$.mount(document.body, '<div>hello world</div>');
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});

	it('should throw an error if the html wasn\'t mounted via the "elemint" function', () => {
		document.body.innerHTML = '';
		$(document.body).mount('<div>hello world</div>');
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});
});

describe('$.mount the target element to "document.body"', () => {
	it('should throw an error if the html wasn\'t mounted via the "elemint" object', () => {
		document.body.innerHTML = '';
		const div = document.createElement('div');
		div.innerHTML = 'hello world';
		$.mount(div);
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});

	it('should throw an error if the html wasn\'t mounted via the "elemint" function', () => {
		document.body.innerHTML = '';
		const div = document.createElement('div');
		div.innerHTML = 'hello world';
		$(div).mount();
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});
});
