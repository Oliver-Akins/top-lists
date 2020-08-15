<template>
	<div class="maximize_size">
		<LoginCard v-if="!is_authed" />
		<MainView
			v-else
			:preview_mode="is_preview"
			:dev_mode="is_dev"
		/>
	</div>
</template>

<script>
// Import Misc JS things
import "./js/prototypes.js";

// Import components
import LoginCard from './components/LoginView.vue';
import MainView from './components/MainView.vue';

export default {
	name: 'App',
	components: {
		"LoginCard": LoginCard,
		"MainView": MainView
	},
	computed: {
		is_dev() {
			let params = new URLSearchParams(window.location.search.slice(1));
			return params.get(`dev`) != null && params.get(`dev`) !== `false`
		},
		is_preview() {
			let params = new URLSearchParams(window.location.search.slice(1));
			return params.get(`preview`) != null && params.get(`preview`) !== `false`
		},
		is_authed() {
			let params = new URLSearchParams(window.location.hash.slice(1));

			if ( this.is_dev || this.is_preview ) { return true; };

			// Check to ensure the authorization was a success
			if (params.get(`access_token`)) {

				// Check if we compare state
				if (process.env.NODE_ENV === `production`) {

					// Compare given state to localstorage state
					let LS_state = localStorage.getItem(`top-spotify-state`);
					if (LS_state == params.get(`state`)) {
						console.info(`State compare success`)
						return true
					}
					console.error(`State compare failed`)
					return false
				} else {
					return true
				}
			} else {
				let error = (new URLSearchParams(window.location.search.slice(1))).get(`error`)

				// Authorization failed, error to the user
				if (error !== null) {
					window.location.hash = ``;
				}
				return false;
			}
		}
	}
}
</script>

<style>
@import "./css/transitions.css";
@import "./css/dark_theme.css";
@import "./css/scrollbar.css";
@import "./css/tooltips.css";
@import "./css/inputs.css";

html, body, .maximize_size {
	user-select: none !important;
	font-family: var(--fonts);
	overflow-x: hidden;
	height: 100%;
	width: 100%;
	padding: 0;
	margin: 0;
}

body {
	background-color: var(--background);
	color: var(--background-text);
}
</style>