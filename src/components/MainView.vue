<template>
	<div id="main_screen">
		<Control
			:dev="dev_mode"
			:preview="preview_mode"
			:api_url="api_base"
			:token="get_token()"
			@playlist_export="handle_export"
			@data_request="get_data"
		/>
		<div v-if="error" class="error">{{ error }}</div>
	</div>
</template>

<script>
import * as axios from "axios";
import ControlCard from "./ControlBar.vue";

export default {
	name: `MainView`,
	props: {
		preview_mode: Boolean,
		dev_mode: Boolean,
	},
	components: {
		Control: ControlCard
	},
	data() { return {
		data: [],
		error: ``,
		api_base: `https://api.spotify.com/v1`,
	};},
	computed: {},
	methods: {
		get_token() {
			let params = new URLSearchParams(window.location.hash.slice(1));
			return params.get(`access_token`);
		},
		handle_export() {
			console.log("Handling the export");
		},
		get_data(config) {
			console.log("Fetching data from Spotify")
			console.log(config)
			let url = `${this.api_base}/me/top/${config.type.toLowerCase()}`;

			let limit = parseInt(config.count) || 10;

			url += `?limit=${limit}&time_range=${config.duration}`;

			axios.get(
				url,
				{ headers: { Authorization: `Bearer ${this.get_token()}` } }
			).then((response) => {
				this.error = ``;
				this.data = response.data.items;
			}).catch((err) => {
				this.error = `${err.name}: ${err.message}`
			});
		},
	}
}
</script>

<style>

</style>