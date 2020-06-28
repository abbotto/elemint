describe('$.fragment - HTML', () => {
	it("should throw an error if the html that was inserted into the fragment can't be read back", () => {
		const html = '<div>0<div>1<p>2<span>3</span></p></div></div>';
		const frag = $.fragment(html);
		expect(frag.childNodes[0].outerHTML).eql(html);
	});
});

describe('$.fragment - Elements', () => {
	it("should throw an error if the contents of the elements that were inserted into the fragment can't be read back", () => {
		document.body.innerHTML = '';
		const div1 = document.createElement('div');
		const div2 = document.createElement('div');
		div1.innerHTML = 'I am div #1';
		div2.innerHTML = 'I am div #2';
		const frag = $.fragment([div1, div2]);
		document.body.appendChild(frag);
		expect(document.body.innerHTML).eql(div1.outerHTML + div2.outerHTML);
	});
});
