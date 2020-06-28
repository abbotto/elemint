describe('$.parent', () => {
	it('should throw an error if the element\'s parent isn\'t returned via the "elemint" object', () => {
		const expectedHTML = '<div><p>hello world</p></div>';
		document.body.innerHTML = expectedHTML;
		const p = document.querySelectorAll('p');
		expect($.parent(p)[0].outerHTML).eql(expectedHTML);
	});

	it('should throw an error if the element\'s parent isn\'t returned via the "elemint" function', () => {
		const expectedHTML = '<div><p>hello world</p></div>';
		document.body.innerHTML = expectedHTML;
		const p = document.querySelectorAll('p');
		expect($(p).parent().$[0].outerHTML).eql(expectedHTML);
	});
});

describe('$.parent - offset', () => {
	it('should throw an error if the element\'s offsetParent isn\'t returned via the "elemint" object', () => {
		const expectedHTML =
			'<div style="position: relative;"><span><span><p>hello world</p></span></span></div>';
		document.body.innerHTML = expectedHTML;
		const p = document.querySelectorAll('span > p');
		expect($.parent(p, true)[0].outerHTML).eql(expectedHTML);
	});

	it('should throw an error if the element\'s offsetParent isn\'t returned via the "elemint" function', () => {
		const expectedHTML =
			'<div style="position: relative;"><span><span><p>hello world</p></span></span></div>';
		document.body.innerHTML = expectedHTML;
		const p = document.querySelectorAll('span > p');
		expect($(p).parent(true).$[0].outerHTML).eql(expectedHTML);
	});
});
