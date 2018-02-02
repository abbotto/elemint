describe('$.class', () => {
	describe('$.class.set', () => {
		it('should throw an error if the class isn\'t enabled via the "elemint" object', () => {
			document.body.innerHTML = '<p>hello world</p>';
			const p = document.querySelectorAll('p');
			$.class(p).set('test');
			expect(p[0].className).eql('test');
		});

		it('should throw an error if the class isn\'t enabled via the "elemint" function', () => {
			document.body.innerHTML = '<p>hello world</p>';
			const p = document.querySelectorAll('p');
			$(p).class.set('test');
			expect(p[0].className).eql('test');
		});
	});

	describe('$.class.kill', () => {
		it('should throw an error if the class isn\'t disabled via the "elemint" object', () => {
			document.body.innerHTML = '<p class="testy test">hello world</p>';
			const p = document.querySelectorAll('p');
			$.class(p).kill('testy');
			expect(p[0].className).eql('test');
		});

		it('should throw an error if the class isn\'t disabled via the "elemint" function', () => {
			document.body.innerHTML = '<p class="testy test">hello world</p>';
			const p = document.querySelectorAll('p');
			$(p).class.kill('testy');
			expect(p[0].className).eql('test');
		});
	});

	describe('$.class.sub', () => {
		it('should throw an error if the classes aren\'t toggled via the "elemint" object', () => {
			document.body.innerHTML = '<p class="testy">hello world</p>';
			const p = document.querySelectorAll('p');
			$.class(p).sub('testy', 'test');
			expect(p[0].className).eql('test');
		});

		it('should throw an error if the classes aren\'t toggled via the "elemint" function', () => {
			document.body.innerHTML = '<p class="testy">hello world</p>';
			const p = document.querySelectorAll('p');
			$(p).class.sub('testy', 'test');
			expect(p[0].className).eql('test');
		});
	});
});
