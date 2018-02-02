describe('$.offset', () => {
	it('should throw an error if the element\'s offset cannot be set', () => {
		document.body.innerHTML = '<div id="element"></div>';
		const element = document.getElementById('element');
		const expectedOffset = { top: 150, left: 150 };
		$.offset(element).set(expectedOffset);

		expect(expectedOffset).eql(
			$.offset(element).get()
		);
	});

	it('should throw an error if the element\'s offset cannot be retrieved', () => {
		document.body.innerHTML = '<div id="element" style="position: fixed; top: 150px; left: 150px;"></div>';
		const element = document.getElementById('element');
		const expectedOffset = { top: 150, left: 150 };

		expect(expectedOffset).eql(
			$.offset(element).get()
		);
	});
});
