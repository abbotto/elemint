describe('$.style - set a style via injection', () => {
	it('should throw an error if the style isn\'t set', () => {
		$.style('body').set('background-color', 'rgb(0, 0, 0)');
		const style = getStyle(document.body, 'background-color');
		expect(style).eql('rgb(0, 0, 0)');
	});
});

describe('$.style - set styles from an array via injection', () => {
	it('should throw an error if the style isn\'t set', () => {
		$.style(['body { background-color: rgb(0, 0, 0) }']).set();
		const style = getStyle(document.body, 'background-color');
		expect(style).eql('rgb(0, 0, 0)');
	});
});

describe('$.style - set styles from an object via injection', () => {
	it('should throw an error if the style isn\'t set', () => {
		$.style('body').set({
			'background-color': 'rgb(0, 0, 0)',
		});
		const style = getStyle(document.body, 'background-color');
		expect(style).eql('rgb(0, 0, 0)');
	});
});

describe('$.style - set a stylesheet via injection', () => {
	it('should throw an error if the style isn\'t set', () => {
		$.style('body { background: rgb(0, 0, 0) }').set();
		expect(document.querySelectorAll('style')[0].innerHTML).eql('body { background: rgb(0, 0, 0) }');
	});
});

describe('$.style - set a style via assignment', () => {
	it('should throw an error if the style isn\'t set', () => {
		$(document.body).style.set('background-color', 'rgb(0, 0, 0)');
		const style = getStyle(document.body, 'background-color');
		expect(style).eql('rgb(0, 0, 0)');
	});
});

describe('$.style - set styles from an object via assignment', () => {
	it('should throw an error if the style isn\'t set', () => {
		$(document.body).style.set({
			'background-color': 'rgb(0, 0, 0)',
		});
		const style = getStyle(document.body, 'background-color');
		expect(style).eql('rgb(0, 0, 0)');
	});
});

describe('$.style - get a style by name', () => {
	it('should throw an error if the style isn\'t returned', () => {
		document.body.style.background = 'rgb(0, 0, 0)';
		expect($.style(document.body).get('background-color')).eql('rgb(0, 0, 0)');
	});
});

describe('$.style - get styles by list of names', () => {
	it('should throw an error if the style isn\'t returned', () => {
		document.body.style.backgroundColor = 'rgb(0, 0, 0)';
		document.body.style.color = 'red';

		expect($.style(document.body).get('background-color', 'color')).eql(
			{ color: 'rgb(255, 0, 0)', 'background-color': 'rgb(0, 0, 0)' }
		);
	});
});
