/* eslint-disable prefer-destructuring */
describe('$.query w/ selector', () => {
	it('should throw an error if the elements aren\'t returned', () => {
		document.body.innerHTML = '<div id="myDiv">myDiv</div>';
		const myDiv = $.query('#myDiv')[0];
		expect(myDiv.id).eql('myDiv');
	});
});

describe('$.query w/ array', () => {
	it('should throw an error if the elements aren\'t returned', () => {
		document.body.innerHTML = '<div id="myDiv">myDiv</div>';
		let myDiv = toArray(document.querySelectorAll('#myDiv'));
		myDiv = $.query(myDiv)[0];
		expect(myDiv.id).eql('myDiv');
	});
});

describe('$.query w/ nodelist', () => {
	it('should throw an error if the elements aren\'t returned', () => {
		document.body.innerHTML = '<div id="myDiv">myDiv</div>';
		let myDiv = document.querySelectorAll('#myDiv');
		myDiv = $.query(myDiv)[0];
		expect(myDiv.id).eql('myDiv');
	});
});

describe('$.query w/ element', () => {
	it('should throw an error if the elements aren\'t returned', () => {
		document.body.innerHTML = '<div id="myDiv">myDiv</div>';
		const myDiv = $.query(document.getElementById('myDiv'))[0];
		expect(myDiv.id).eql('myDiv');
	});
});
