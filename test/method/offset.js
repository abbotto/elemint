describe('$.offset', () => {
	const expectedOffset = { top: 150, left: 150 };

	describe('$.offset.set', () => {
		it('should throw an error if the element\'s offset cannot be set via the "elemint" object', () => {
			document.body.innerHTML = '<div id="element"></div>';
			const element = document.getElementById('element');
			$(element).offset.set(expectedOffset);

			expect(expectedOffset).eql(
				$.offset(element).get()
			);
		});

		it('should throw an error if the element\'s offset cannot be set via the "elemint" function', () => {
			document.body.innerHTML = '<div id="element"></div>';
			const element = document.getElementById('element');
			$(element).offset.set(expectedOffset);

			expect(expectedOffset).eql(
				$(element).offset.get()
			);
		});
	});

	describe('$.offset.get', () => {
		it('should throw an error if the element\'s offset cannot be retrieved via the "elemint" object', () => {
			document.body.innerHTML = '<div id="element" style="position: fixed; top: 150px; left: 150px;"></div>';
			const element = document.getElementById('element');

			expect(expectedOffset).eql(
				$(element).offset.get()
			);
		});

		it('should throw an error if the element\'s offset cannot be retrieved via the "elemint" function', () => {
			document.body.innerHTML = '<div id="element" style="position: fixed; top: 150px; left: 150px;"></div>';
			const element = document.getElementById('element');

			expect(expectedOffset).eql(
				$(element).offset.get()
			);
		});
	});
});
