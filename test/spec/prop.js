/* eslint-disable prefer-destructuring */
describe('$.prop ', () => {
	describe('$.prop.set', () => {
		it('should throw an error if the attribute string isn\'t applied via the "elemint" object', () => {
			const div = document.createElement('div');
			$.prop(div).set('id', 'myDiv');
			const attr = div.getAttribute('id');
			expect(attr).eql('myDiv');
		});

		it('should throw an error if the attribute string isn\'t applied via the "elemint" function', () => {
			const div = document.createElement('div');
			$(div).prop.set('id', 'myDiv');
			const attr = div.getAttribute('id');
			expect(attr).eql('myDiv');
		});

		it('should throw an error if the attribute object isn\'t applied via the "elemint" object', () => {
			const div = document.createElement('div');
			$.prop(div).set({ id: 'myDiv' });
			const attr = div.getAttribute('id');
			expect(attr).eql('myDiv');
		});

		it('should throw an error if the attribute object isn\'t applied via the "elemint" function', () => {
			const div = document.createElement('div');
			$(div).prop.set({ id: 'myDiv' });
			const attr = div.getAttribute('id');
			expect(attr).eql('myDiv');
		});
	});

	describe('$.prop.get', () => {
		it('should throw an error if the attribute isn\'t returned via the "elemint" object', () => {
			const div = document.createElement('div');
			div.setAttribute('id', 'myDiv');
			const attr = $.prop(div).get('id');
			expect(attr).eql('myDiv');
		});

		it('should throw an error if the attribute isn\'t returned via the "elemint" function', () => {
			const div = document.createElement('div');
			div.setAttribute('id', 'myDiv');
			const attr = $(div).prop.get('id');
			expect(attr).eql('myDiv');
		});

		it('should throw an error if the list of attribute isn\'t returned via the "elemint" object', () => {
			const div = document.createElement('div');
			div.setAttribute('id', 'myDiv');
			div.setAttribute('name', 'myDiv');
			const attr = $.prop(div).get('id', 'name');
			expect(attr).eql({ id: 'myDiv', name: 'myDiv' });
		});

		it('should throw an error if the list of attribute isn\'t returned via the "elemint" function', () => {
			const div = document.createElement('div');
			div.setAttribute('id', 'myDiv');
			div.setAttribute('name', 'myDiv');
			const attr = $(div).prop.get('id', 'name');
			expect(attr).eql({ id: 'myDiv', name: 'myDiv' });
		});
	});

	describe('$.prop.void', () => {
		it('should throw an error if the attribute isn\'t removed via the "elemint" object', () => {
			const div = document.createElement('div');
			div.setAttribute('id', 'myDiv');
			$.prop(div).void('id');
			const attr = div.getAttribute('id');
			expect(attr).eql(null);
		});

		it('should throw an error if the attribute isn\'t removed via the "elemint" function', () => {
			const div = document.createElement('div');
			div.setAttribute('id', 'myDiv');
			$(div).prop.void('id');
			const attr = div.getAttribute('id');
			expect(attr).eql(null);
		});
	});

	describe('$.prop.test', () => {
		it("should throw an error if a property isn't supported by an element", () => {
			const div = document.createElement('div');
			expect($.prop(div).test('src')).eql(false);
		});

		it('should pass if a property is supported by an element', () => {
			const img = document.createElement('img');
			expect($.prop(img).test('src')).eql(true);
		});
	});
});
