describe('$.size', () => {
	it('should throw an error if the element\'s size cannot be set', () => {
		document.body.innerHTML = '<div id="element"></div>';
		const element = document.getElementById('element');
		const expectedSize = { height: '150px', width: '150px' };
		$.size(element).set(expectedSize);

		expect(expectedSize).eql(
			$.size(element).get()
		);
	});

	it('should throw an error if the element\'s size cannot be retrieved', () => {
		document.body.innerHTML = '<div id="element" style="height: 150px; width: 150px;"></div>';
		const element = document.getElementById('element');
		const expectedSize = { height: '150px', width: '150px' };

		expect(expectedSize).eql(
			$.size(element).get()
		);
	});
});
