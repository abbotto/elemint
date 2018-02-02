/* eslint-disable prefer-destructuring */
describe('$.prop - set', () => {
	it('should throw an error if the attribute isn\'t applied', () => {
		const div = document.createElement('div');
		$.prop(div).set('id', 'myDiv');
		const attr = div.getAttribute('id');
		expect(attr).eql('myDiv');
	});
});

describe('$.prop - set w/ object', () => {
	it('should throw an error if the attribute isn\'t applied', () => {
		const div = document.createElement('div');
		$.prop(div).set({ id: 'myDiv' });
		const attr = div.getAttribute('id');
		expect(attr).eql('myDiv');
	});
});

describe('$.prop - get', () => {
	it('should throw an error if the attribute isn\'t returned', () => {
		const div = document.createElement('div');
		div.setAttribute('id', 'myDiv');
		const attr = $.prop(div).get('id');
		expect(attr).eql('myDiv');
	});
});

describe('$.prop - get w/ list of props', () => {
	it('should throw an error if the attributes aren\'t returned', () => {
		const div = document.createElement('div');
		div.setAttribute('id', 'myDiv');
		div.setAttribute('class', 'myClass');
		const attr = $.prop(div).get('id', 'class');
		const id = attr.id;
		const clss = attr.class;
		expect(id + clss).eql('myDivmyClass');
	});
});

describe('$.prop - disable w/ removeAttribute', () => {
	it('should throw an error if the attribute isn\'t removed', () => {
		const div = document.createElement('div');
		div.setAttribute('id', 'myDiv');
		$.prop(div).kill('id');
		const attr = div.getAttribute('id');
		expect(attr).eql(null);
	});
});
