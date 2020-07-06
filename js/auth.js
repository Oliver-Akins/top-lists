function auth_url () {
	let params = [
		`client_id=${this.auth.client_id}`,
		`response_type=token`,
		`redirect_uri=${encodeURIComponent(this.auth.redirect)}`,
		`scope=${encodeURIComponent(this.auth.scopes.join(" "))}`,
		`show_dialog=${this.auth.show_dialog}`
	];

	// Create the state data if we are using it
	if (this.auth.use_state) {
		let state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		params.push(`state=${state}`);
		localStorage.setItem(`top-spotify-state`, state);
	};

	return `${this.auth.base_url}?${params.join("&")}`;
};


function verify_auth () {
	let params = new URLSearchParams(window.location.hash.slice(1));

	// Check to ensure the authorization was a success
	if (params.get(`access_token`)) {
		this.get_user()

		// Check if we compare state
		if (this.use_state) {

			// Compare given state to localstorage state
			let LS_state = localStorage.getItem(`top-spotify-state`);
			if (LS_state = params.get(`state`)) {
				console.info(`State compare success`)
				this.authed = true;
				return true
			}
			console.error(`State compare failed`)
			return false
		} else {
			return true
		}
	} else {
		let error = (new URLSearchParams(window.location.search)).get(`error`)

		// Authorization failed, error to the user
		if (error !== null) {
			this.error.auth = `Authentication failed or was cancelled, please try again.`;
			window.location.hash = ``;
		}
		return false;
	}
}