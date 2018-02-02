describe('$.after', () => {
	it('should throw an error if the element isn\'t returned via the "elemint" object', () => {
		document.body.innerHTML = '<p>hello world</p><span>hello world</span>';
		const p = document.querySelectorAll('p');
		expect($.after(p)[0].outerHTML).eql('<span>hello world</span>');
	});

	it('should throw an error if the element isn\'t returned via the "elemint" function', () => {
		document.body.innerHTML = '<p>hello world</p><span>hello world</span>';
		const p = document.querySelectorAll('p');
		expect($(p).after().$[0].outerHTML).eql('<span>hello world</span>');
	});
});

describe('$.after w/ selector', () => {
	it('should throw an error if the element isn\'t returned via the "elemint" object', () => {
		document.body.innerHTML = '<p>hello world</p><span id="one">1</span><span id="two">2</span><span id="three">3</span>';
		const p = document.querySelector('p');
		expect($.after(p, '#three')[0].outerHTML).eql('<span id="three">3</span>');
	});

	it('should throw an error if the element isn\'t returned via the "elemint" function', () => {
		document.body.innerHTML = '<p>hello world</p><span id="one">1</span><span id="two">2</span><span id="three">3</span>';
		const p = document.querySelector('p');
		expect($(p).after('#three').$[0].outerHTML).eql('<span id="three">3</span>');
	});
});
