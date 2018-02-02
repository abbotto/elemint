describe('Inject scripts', () => {
	it('should throw an error if no scripts are injected', () => {
		const html = '<div>Hello world!</div>';
		const output = $.print({
			template: html,
			script: [
				'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.js'
			],
			test: true
		});
		expect(output.scripts).eql(1);
	});
});

describe('Inject stylesheets', () => {
	it('should throw an error if no stylesheets are injected', () => {
		const html = '<div>Hello world!</div>';
		const output = $.print({
			template: html,
			style: [
				'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
			],
			test: true
		});
		expect(output.styles).eql(1);
	});
});

describe('Inject template - Element', () => {
	it("should throw an error if the provided element's outerHTML isn't injected", () => {
		const div = document.createElement('div');
		div.innerHTML = 'Hello world!';
		const output = $.print({
			template: div,
			test: true
		});
		expect(output.template).eql('<div>Hello world!</div>');
	});
});

describe('Inject template - HTML', () => {
	it("should throw an error if the provided template isn't injected", () => {
		const html = '<div>Hello world!</div>';
		const output = $.print({
			template: html,
			test: true
		});
		expect(output.template).eql('<div>Hello world!</div>');
	});
});

describe('Print the template', () => {
	it("should throw an error if frame.print() won't execute", () => {
		const html = '<div>Hello world!</div>';
		const output = $.print({
			template: html,
			test: true
		});
		expect(output.print).eql(true);
	});
});
