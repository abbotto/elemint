describe('$.mount', () => {
	it('should throw an error if the elements aren\'t mounted', () => {
		const mountpoint = document.createElement('mountpoint');
		const expectedHTML = '<div><span></span></div>';
		document.body.innerHTML = expectedHTML;
		mountpoint.innerHTML = '<span><div></div></span>';
		$.mount(mountpoint, document.body);

		expect(mountpoint.innerHTML).eql(expectedHTML);
	});
});
