<template>
	<div id="login_screen" class="maximize_size">
		<div class="card">
			<div
				v-if="error"
				class="alert error"
			>
				{{ error }}
			</div>
			<a :href="spotify_auth_url">
				<button>Login With Spotify</button>
			</a>
			<p class="alert">
				This website will be able to see your top artists and tracks,
				and make both public and private playlists on your behalf. This
				is all done in your web browser.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoginView',
	data() { return {
		auth_base: `https://accounts.spotify.com/authorize`,
		use_state: true,
		client_id: `3a1795e9d55445b0aa0c05dd74c866fb`,
		scopes: [
			`user-top-read`,
			`playlist-modify-public`,
			`playlist-modify-private`,
			`playlist-modify-public`,
			`playlist-modify-private`,
		],
		show_dialog: process.env.NODE_ENV !== `production`,
	}},
	computed: {
		spotify_auth_url() {
			let params = [
				`client_id=${this.client_id}`,
				`response_type=token`,
				`redirect_uri=${encodeURIComponent(this.auth_redirect)}`,
				`scope=${encodeURIComponent(this.scopes.join(" "))}`,
				`show_dialog=${this.show_dialog}`
			];

			// Create the state data if we are using it
			if (this.use_state) {
				let state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				params.push(`state=${state}`);
				sessionStorage.setItem(this.storage_key.state, state);
			};

			return `${this.auth_base}?${params.join("&")}`;
		},
		error() {
			let error_message = (new URLSearchParams(window.location.search.slice(1))).get(`error`);
			return error_message ? error_message : ``;
		},
	}
}
</script>

<style scoped>
#login_screen {
	font-family: var(--fonts);
	justify-content: center;
	align-items: center;
	display: flex;
	height: 100%;
	width: 100%;
}

.card {
	border-radius: var(--corner-rounding);
	background-color: var(--card-colour);
	color: var(--spotify-green);
	text-align: center;
	padding: 30px;
	width: 90%;
}

button {
	background-color: var(--button-background);
	color: var(--button-text);
	font-family: var(--fonts);
	border-radius: 50px;
	padding: 10px 20px;
	border-style: none;
	font-size: larger;
	outline: none;
}
button:hover { cursor: pointer; }


.alert {
	margin-bottom: 10px;
	padding: 5px;
}


.error {
	background-color: var(--error-background);
	border-radius: var(--corner-rounding);
	border-color: var(--error);
	color: var(--error-text);
	border-style: solid;
	border-width: 2px;
}
</style>
