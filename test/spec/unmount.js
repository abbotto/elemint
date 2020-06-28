describe('$.unmount', () => {
	it('should throw an error if the target element wasn\'t unmounted via the "elemint" object', () => {
		document.body.innerHTML = '<div>hello world</div>';
		$.unmount(document.body.firstChild);
		expect(document.body.innerHTML).eql('');
	});

	it('should throw an error if the target element wasn\'t unmounted via the "elemint" function', () => {
		document.body.innerHTML = '<div>hello world</div>';
		$(document.body.firstChild).unmount();
		expect(document.body.innerHTML).eql('');
	});

	it('should throw an error if the relative element wasn\'t unmounted by location reference via the "elemint" object', () => {
		document.body.innerHTML = '<div>hello world</div><div>abc123</div>';
		$.unmount(document.body, 'innerEnd');
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});

	it('should throw an error if the relative element wasn\'t unmounted by location reference via the "elemint" function', () => {
		document.body.innerHTML = '<div>hello world</div><div>abc123</div>';
		$(document.body).unmount('innerEnd');
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});

	it('should throw an error if the child element wasn\'t unmounted by node reference via the "elemint" object', () => {
		document.body.innerHTML = '<div>hello world</div><div>abc123</div>';
		const div = document.querySelectorAll('div');
		$.unmount(document.body, div[1]);
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});

	it('should throw an error if the child element wasn\'t unmounted by node reference via the "elemint" function', () => {
		document.body.innerHTML = '<div>hello world</div><div>abc123</div>';
		const div = document.querySelectorAll('div');
		$(document.body).unmount(div[1]);
		expect(document.body.innerHTML).eql('<div>hello world</div>');
	});
});
