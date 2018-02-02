describe('$.layer.set', () => {
	it('should throw an error if the z-index isn\'t set via the "elemint" object', () => {
		document.body.innerHTML = '<div id="myDiv"></div>';
		const myDiv = document.querySelector('#myDiv');
		$.layer(myDiv).set(999);
		expect(parseInt(myDiv.style['z-index'], 10)).eql(999);
	});

	it('should throw an error if the z-index isn\'t set via the "elemint" function', () => {
		document.body.innerHTML = '<div id="myDiv"></div>';
		const myDiv = document.querySelector('#myDiv');
		$(myDiv).layer.set(999);
		expect(parseInt(myDiv.style['z-index'], 10)).eql(999);
	});
});

describe('$.layer.get', () => {
	it('should throw an error if the z-index isn\'t returned via the "elemint" object', () => {
		document.body.innerHTML = '<div id="myDiv"></div>';
		const myDiv = document.querySelector('#myDiv');
		myDiv.style['z-index'] = 999;
		expect($.layer(myDiv).get()).eql(999);
	});

	it('should throw an error if the z-index isn\'t returned via the "elemint" function', () => {
		document.body.innerHTML = '<div id="myDiv"></div>';
		const myDiv = document.querySelector('#myDiv');
		myDiv.style['z-index'] = 999;
		expect($(myDiv).layer.get()).eql(999);
	});
});
