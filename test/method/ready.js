describe('$.ready', () => {
	it('should throw an error if the event isn\'t emitted', () => {
		const expectedHTML = '<div id="element"></div>';

		$.ready(document, () => {
			document.body.innerHTML = expectedHTML;
		});

		expect(document.body.innerHTML).eql(
			expectedHTML
		);
	});
});
