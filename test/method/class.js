describe('$.class - set', () => {
	it('should throw an error if the class isn\'t enabled', () => {
		document.body.innerHTML = '<p>hola</p>';
		const p = document.querySelectorAll('p');
		$.class(p).set('test');
		expect(p[0].className).eql('test');
	});
});

describe('$.class - kill', () => {
	it('should throw an error if the class isn\'t disabled', () => {
		document.body.innerHTML = '<p class="testy test">hola</p>';
		const p = document.querySelectorAll('p');
		$.class(p).kill('testy');
		expect(p[0].className).eql('test');
	});
});

describe('$.class - sub', () => {
	it('should throw an error if the classes aren\'t toggled', () => {
		document.body.innerHTML = '<p class="testy">hola</p>';
		const p = document.querySelectorAll('p');
		$.class(p).sub('testy', 'test');
		expect(p[0].className).eql('test');
	});
});

describe('$.class - test', () => {
	it('should throw an error if the class doesn\'t exist', () => {
		document.body.innerHTML = '<p>hola</p>';
		const p = document.querySelectorAll('p');
		$.class(p).test('fake-class');
		expect(p[0].className).eql('');
	});
});
