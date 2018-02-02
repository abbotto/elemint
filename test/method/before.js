describe('$.before', () => {
	it('should throw an error if the element isn\'t returned via the "elemint" object', () => {
		document.body.innerHTML = '<span>hello world</span><p>hello world</p>';
		const p = document.querySelectorAll('p');
		expect($.before(p)[0].outerHTML).eql('<span>hello world</span>');
	});

	it('should throw an error if the element isn\'t returned via the "elemint" function', () => {
		document.body.innerHTML = '<span>hello world</span><p>hello world</p>';
		const p = document.querySelectorAll('p');
		expect($(p).before().$[0].outerHTML).eql('<span>hello world</span>');
	});
});

describe('$.before w/ selector', () => {
	it('should throw an error if the element isn\'t returned via the "elemint" object', () => {
		document.body.innerHTML = '<span id="one">1</span><span id="two">2</span><span id="three">3</span><p>hello world</p>';
		const p = document.querySelectorAll('p');
		expect($.before(p, '#one')[0].outerHTML).eql('<span id="one">1</span>');
	});

	it('should throw an error if the element isn\'t returned via the "elemint" function', () => {
		document.body.innerHTML = '<span id="one">1</span><span id="two">2</span><span id="three">3</span><p>hello world</p>';
		const p = document.querySelectorAll('p');
		expect($(p).before('#one').$[0].outerHTML).eql('<span id="one">1</span>');
	});
});
