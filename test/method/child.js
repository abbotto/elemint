describe('$.child', () => {
	it('should throw an error if the children cannot be found', () => {
		const div = document.createElement('div');
		div.innerHTML = 'I am div #1<div>I am sub-div #1</div>';
		document.body.innerHTML = div.outerHTML;
		const children = $.child(document.body);
		expect(children[0].outerHTML).eql(div.outerHTML);
	});
});

describe('$.child w/ selector', () => {
	it('should throw an error if the specified children cannot be found', () => {
		const div = document.createElement('div');

		div.innerHTML = 'I am div #1'
			+ '<div class="item">I item #1</div>'
			+ '<div>I am sub-div #2</div>'
			+ '<div class="item">I am item #2'
				+ '<div class="item">I am item #3</div>'
			+ '</div>'
		;

		document.body.appendChild(div);
		const children = $.child(div, '.item');

		expect(
			children[0].outerHTML
			+ children[1].outerHTML
		).eql(
			'<div class="item">I item #1</div>'
			+ '<div class="item">I am item #2<div class="item">I am item #3</div></div>'
		);
	});
});
