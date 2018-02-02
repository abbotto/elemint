describe('$.ascend', () => {
	beforeEach(() => {
		document.body.innerHTML = '<div>0<div>1<p>2<container>3</container></p></div></div>';
	});

	it('should throw an error if the ancestor isn\'t returned via the "elemint" object', () => {
		document.body.innerHTML = '<div>1<p>2<container>3</container></p></div>';
		const container = document.querySelectorAll('container');
		expect($.ascend(container[0])[1].innerHTML).eql('1<p>2<container>3</container></p>');
	});

	it('should throw an error if the ancestor isn\'t returned via the "elemint" function', () => {
		expect($('container').ascend().$[1].innerHTML).eql('1<p>2<container>3</container></p>');
	});

	it('should throw an error if the selected ancestor isn\'t returned via the "elemint" object', () => {
		const container = document.querySelectorAll('container');
		expect($.ascend(container[0], 'div')[1].innerHTML).eql('0<div>1<p>2<container>3</container></p></div>');
	});

	it('should throw an error if the selected ancestor isn\'t returned via the "elemint" function', () => {
		expect($('container').ascend('div').$[1].innerHTML).eql('0<div>1<p>2<container>3</container></p></div>');
	});

	it('should throw an error if the ancestor isn\'t returned at the specified limit via the "elemint" object', () => {
		const container = document.querySelectorAll('container');
		expect($.ascend(container[0], 2)[1].innerHTML).eql('1<p>2<container>3</container></p>');
	});

	it('should throw an error if the ancestor isn\'t returned at the specified limit via the "elemint" function', () => {
		expect($('container').ascend(2).$[1].innerHTML).eql('1<p>2<container>3</container></p>');
	});

	it('should throw an error if the selected ancestor isn\'t returned at the specified limit via the "elemint" object', () => {
		const container = document.querySelectorAll('container');
		expect($.ascend(container[0], 'div', 2)[0].innerHTML).eql('1<p>2<container>3</container></p>');
	});

	it('should throw an error if the selected ancestor isn\'t returned at the specified limit via the "elemint" object', () => {
		expect($('container').ascend('div', 2).$[0].innerHTML).eql('1<p>2<container>3</container></p>');
	});
});
