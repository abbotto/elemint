describe('$.style', () => {
	const docBody = document.body;
	const styleSheet = 'body { background-color: rgba(0, 0, 0, 0) }';

	describe("$.style.set - set a single style property by injecting it into the '<head />' tag", () => {
		it('should throw an error if the style isn\'t set via the "elemint" object', () => {
			$.style('body').set('background-color', 'rgba(0, 0, 0, 0)');
			const style = getStyle(docBody, 'background-color');
			expect(style).eql('rgba(0, 0, 0, 0)');
		});
	});

	describe("$.style.set - set styles from an array by injecting them into the '<head />' tag", () => {
		it('should throw an error if the style isn\'t set via the "elemint" object', () => {
			$.style([styleSheet]).set();
			const style = getStyle(docBody, 'background-color');
			expect(style).eql('rgba(0, 0, 0, 0)');
		});

		it('should throw an error if the style is set via the "elemint" function', () => {
			try {
				$([styleSheet]).style.set();
			} catch (e) {
				expect((e + '').indexOf('Invalid argument') > -1).eq(true);
			}
		});
	});

	describe("$.style.set - set styles from an object by injecting them into the '<head />' tag", () => {
		it('should throw an error if the style isn\'t set via the "elemint" object', () => {
			$.style('body').set({
				'background-color': 'rgba(0, 0, 0, 0)'
			});
			const style = getStyle(docBody, 'background-color');
			expect(style).eql('rgba(0, 0, 0, 0)');
		});

		it('should throw an error if the style is set via the "elemint" function', () => {
			try {
				$({ 'background-color': 'rgba(0, 0, 0, 0)' }).style.set();
			} catch (e) {
				expect((e + '').indexOf('Invalid argument') > -1).eq(true);
			}
		});
	});

	describe("$.style.set - set a stylesheet by injecting it into the '<head />' tag", () => {
		it('should throw an error if the style isn\'t set via the "elemint" object', () => {
			$.style('body { background: rgba(0, 0, 0, 0) }').set();
			expect(document.querySelectorAll('style')[0].innerHTML).eql(
				'body { background: rgba(0, 0, 0, 0) }'
			);
		});

		it('should throw an error if the style is set via the "elemint" function', () => {
			try {
				$('body { background: rgba(0, 0, 0, 0) }').style.set();
			} catch (e) {
				expect((e + '').indexOf('Failed to execute') > -1).eq(true);
			}
		});
	});

	describe('$.style.set - set an inline style via string assignment', () => {
		it('should throw an error if the style isn\'t set via the "elemint" object', () => {
			$.style(docBody).set('background-color', 'rgba(0, 0, 0, 0)');
			const style = getStyle(docBody, 'background-color');
			expect(style).eql('rgba(0, 0, 0, 0)');
		});

		it('should throw an error if the style isn\'t set via the "elemint" function', () => {
			$(docBody).style.set('background-color', 'rgba(0, 0, 0, 0)');
			const style = getStyle(docBody, 'background-color');
			expect(style).eql('rgba(0, 0, 0, 0)');
		});
	});

	describe('$.style.set - set inline styles via object assignment', () => {
		it('should throw an error if the style isn\'t set via the "elemint" object', () => {
			$.style(docBody).set({
				'background-color': 'rgba(0, 0, 0, 0)'
			});
			const style = getStyle(docBody, 'background-color');
			expect(style).eql('rgba(0, 0, 0, 0)');
		});

		it('should throw an error if the style isn\'t set via the "elemint" function', () => {
			$(docBody).style.set({
				'background-color': 'rgba(0, 0, 0, 0)'
			});
			const style = getStyle(docBody, 'background-color');
			expect(style).eql('rgba(0, 0, 0, 0)');
		});
	});

	describe('$.style.get - get a style by name', () => {
		it('should throw an error if the style isn\'t returned via the "elemint" object', () => {
			docBody.style.background = 'rgba(0, 0, 0, 0)';
			expect($.style(docBody).get('background-color')).eql('rgba(0, 0, 0, 0)');
		});

		it('should throw an error if the style isn\'t returned via the "elemint" function', () => {
			docBody.style.background = 'rgba(0, 0, 0, 0)';
			expect($(docBody).style.get('background-color')).eql('rgba(0, 0, 0, 0)');
		});
	});

	describe('$.style.get - get styles from a list of names', () => {
		it('should throw an error if the style isn\'t returned via the "elemint" object', () => {
			docBody.style.backgroundColor = 'rgba(0, 0, 0, 0)';
			docBody.style.color = 'red';

			expect($.style(docBody).get('background-color', 'color')).eql({
				color: 'rgb(255, 0, 0)',
				'background-color': 'rgba(0, 0, 0, 0)'
			});
		});

		it('should throw an error if the style isn\'t returned via the "elemint" function', () => {
			docBody.style.backgroundColor = 'rgba(0, 0, 0, 0)';
			docBody.style.color = 'red';

			expect($(docBody).style.get('background-color', 'color')).eql({
				color: 'rgb(255, 0, 0)',
				'background-color': 'rgba(0, 0, 0, 0)'
			});
		});
	});
});
