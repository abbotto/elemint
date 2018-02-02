describe('$.ascend', () => {
	it('should throw an error if the ancestor isn\'t returned', () => {
		document.body.innerHTML = '<div>1<p>2<span>3</span></p></div>';
		const span = document.querySelectorAll('span');
		expect($.ascend(span[0], null, 2)[0].innerHTML).eql('1<p>2<span>3</span></p>');
	});
});

describe('$.ascend w/ selector', () => {
	it('should throw an error if the ancestor isn\'t returned', () => {
		document.body.innerHTML = '<div>0<div>1<p>2<span>3</span></p></div></div>';
		const span = document.querySelectorAll('span');
		expect($.ascend(span[0], 'div')[0].innerHTML).eql('0<div>1<p>2<span>3</span></p></div>');
	});
});
