describe('$.position', () => {
	it('should throw an error if the elements position isn\'t returned via the "elemint" object', () => {
		document.body.innerHTML =
			'<div id="myDiv" style="position: fixed; top: 100px; left: 100px; z-index: 100;">myDiv</div>';
		const myDiv = document.getElementById('myDiv');
		const position = $.position(myDiv);
		expect(myDiv.style.left + myDiv.style.top + position.z).eql('100px100px100');
	});

	it('should throw an error if the elements position isn\'t returned via the "elemint" function', () => {
		document.body.innerHTML =
			'<div id="myDiv" style="position: fixed; top: 100px; left: 100px; z-index: 100;">myDiv</div>';
		const myDiv = document.getElementById('myDiv');
		const position = $(myDiv).position();
		expect(myDiv.style.left + myDiv.style.top + position.z).eql('100px100px100');
	});
});
