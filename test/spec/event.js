describe('$.event.emit', () => {
	it("should throw an error if the event isn't emitted", () => {
		const expectedHTML = '<div id="element"></div>';
		window.innerHTML = () => {
			document.body.innerHTML = expectedHTML;
		};

		const eventHTML = '<div onclick="window.innerHTML()"></div>';
		document.body.innerHTML = eventHTML;

		$.event(document.body.firstChild).click();

		expect(document.body.innerHTML).eql(expectedHTML);
	});
});

describe('$.event.set', () => {
	it("should throw an error if the event isn't set", () => {
		const expectedHTML = '<div id="element"></div>';
		const config = {
			tag: 'myEvent',
			on: 'click',
			callback: () => {
				document.body.innerHTML = expectedHTML;
			}
		};

		$.event(document.body).set(config);
		$.event(document.body).click();

		expect(document.body.innerHTML).eql(expectedHTML);
	});
});

describe('$.event.void', () => {
	it("should throw an error if the event isn't voided", () => {
		const expectedTEXT = 'abc123';
		document.body.innerHTML = expectedTEXT;

		const newHTML = '<div id="element"></div>';
		const config = {
			tag: 'myEvent',
			on: 'click',
			callback: () => {
				document.body.innerHTML = newHTML;
			}
		};

		$.event(document.body).set(config);
		$.event(document.body).void('myEvent');
		$.event(document.body).click();

		expect(document.body.innerHTML).eql(expectedTEXT);
	});
});
