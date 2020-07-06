function get_button_text () {
	if (this.count === ``) {
		return this.type;
	}
	else if (this.count === `1`) {
		this.error.main = ``;
		return this.type.slice(0,-1);
	}
	else if (this.count <= 0) {
		this.error.main = `Cannot get 0 or fewer ${this.type.toLowerCase()}`;
		return false;
	}
	else if (this.count > 50) {
		this.error.main = `Cannot get more than 50 ${this.type.toLowerCase()}`;
		return false;
	};
	this.error.main = ``;
	return this.type;
};