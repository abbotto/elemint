describe('$.remove', () => {
	it('should throw an error if element wasn\'t removed', () => {
		document.body.innerHTML = '<div>hola</div>';
		$.remove(document.body.firstChild);
		expect(document.body.innerHTML).eql('');
	});
});
