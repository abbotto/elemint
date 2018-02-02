describe('$.layer - set layer', () => {
	it('should throw an error if the z-index isn\'t set', () => {
		document.body.innerHTML = '<div id="myDiv"></div>';
		const myDiv = document.querySelector('#myDiv');
		$.layer(myDiv).set(999);
		expect(parseInt(myDiv.style['z-index'], 10)).eql(999);
	});
});

describe('$.layer - get layer', () => {
	it('should throw an error if the z-index isn\'t returned', () => {
		document.body.innerHTML = '<div id="myDiv"></div>';
		const myDiv = document.querySelector('#myDiv');
		myDiv.style['z-index'] = 999;
		expect($.layer(myDiv).get()).eql(999);
	});
});
