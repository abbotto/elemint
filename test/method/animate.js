describe('$.animate.set', () => {
	let counter = -1;

	const config = {
		tag: 'myAnimation',
		callback: () => { counter += 1; }
	};

	$.animate.set(config);

	it('should throw an error if the animation callback isn\'t executed', () => {
		expect(counter > -1).eql(true);
	});

	it('should throw an error if the animation isn\'t killed', () => {
		// Animation is found because it was created
		expect($.animate.kill('myAnimation')).eql(true);
		// Animation can no longer be found because it was deleted
		expect($.animate.kill('myAnimation')).eql(false);
	});
});
