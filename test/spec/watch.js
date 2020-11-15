describe('$.watch.set', () => {
	it("should throw an error if the 'MutationObserver' event isn't fired", () => {
		const bodyHTML = '<div>1st-child</div><div>2nd-child</div>';
		document.body.innerHTML = bodyHTML;

		const callback = function () {
			document.body.firstChild.innerHTML = '1st-child-updated';
		};

		$.watch(document.body.lastChild).set(
			'watch-set',
			{ childList: true, subtree: true },
			callback
		);

		document.body.lastChild.innerHTML = '2nd-child-updated';

		setTimeout(() => {
			expect(document.body.firstChild.innerHTML).eql('1st-child-updated');
		}, 100);
	});
});

describe('$.watch.void', () => {
	it("should throw an error if the 'MutationObserver' event isn't cancelled", () => {
		const bodyHTML = '<div>1st-child</div><div>2nd-child</div>';
		document.body.innerHTML = bodyHTML;

		const callback = function () {
			document.body.firstChild.innerHTML = '1st-child-updated';
		};

		$.watch(document.body.lastChild).set(
			'watch-set',
			{ childList: true, subtree: true },
			callback
		);

		$.watch.void('watch-set');

		document.body.lastChild.innerHTML = '2nd-child-updated';

		setTimeout(() => {
			expect(document.body.firstChild.innerHTML).eql('1st-child');
		}, 100);
	});
});
