String.prototype.toTitleCase = function () {
	let words = this.split(` `);
	let new_words = [];
	for (var word of words) {
		new_words.push(
			`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
		);
	};
	return new_words.join(` `);
}