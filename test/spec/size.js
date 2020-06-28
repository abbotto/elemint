describe('$.size', () => {
	const expectedSizeForHW = { height: '150px', width: '150px' };
	const expectedSizeForHeight = { height: '150px' };
	const expectedSizeForWidth = { width: '150px' };

	describe('$.size.set', () => {
		it('should throw an error if the element\'s size cannot be set via the "elemint" object', () => {
			document.body.innerHTML = '<div id="element"></div>';
			const element = document.getElementById('element');

			$.size(element).set(expectedSizeForHW);

			expect(expectedSizeForHW).eql($.size(element).get());
		});

		it('should throw an error if the element\'s size cannot be retrieved via the "elemint" function', () => {
			document.body.innerHTML =
				'<div id="element" style="height: 150px; width: 150px;"></div>';
			const element = document.getElementById('element');

			$(element).size.set(expectedSizeForHW);

			expect(expectedSizeForHW).eql($(element).size.get());
		});
	});

	describe('$.size.get', () => {
		it('should throw an error if the element\'s height cannot be retrieved via the "elemint" object', () => {
			document.body.innerHTML = '<div id="element" style="height: 150px;"></div>';
			const element = document.getElementById('element');

			expect(expectedSizeForHeight).eql($.size(element).get('height'));
		});

		it('should throw an error if the element\'s width cannot be retrieved via the "elemint" function', () => {
			document.body.innerHTML = '<div id="element" style="width: 150px;"></div>';
			const element = document.getElementById('element');

			expect(expectedSizeForWidth).eql($(element).size.get('width'));
		});
	});
});
