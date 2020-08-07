<template>
	<div id="main_screen">
		<Control
			:dev="dev_mode"
			:preview="preview_mode"
			:api_url="api_base"
			:auth_redirect="auth_redirect"
			:token="get_token()"
			:data_exists="data.length !== 0"
			:is_track_data="config.type === 'Tracks'"
			@playlist_export="handle_export"
			@data_request="get_data"
		/>
		<div v-if="error" class="error">{{ error }}</div>
		<div v-else id="data_view">
			<component
				:is="config.type.slice(0, -1)"
				v-for="item in items"
				:key="item.uri"
				:item="item"
			/>
		</div>
	</div>
</template>

<script>
import * as axios from "axios";
import ControlCard from "./ControlBar.vue";
import ArtistCard from "./cards/Artist.vue";
import TrackCard from "./cards/Track.vue";

export default {
	name: `MainView`,
	props: {
		preview_mode: {
			type: Boolean,
			required: true,
		},
		dev_mode: {
			type: Boolean,
			required: true,
		},
		auth_redirect: {
			type: String,
			required: true,
		}
	},
	components: {
		Control: ControlCard,
		Track: TrackCard,
		Artist: ArtistCard,
	},
	data() { return {
		config: {},
		data: [],
		error: ``,
		api_base: `https://api.spotify.com/v1`,
	};},
	computed: {
		items() {
			return this.data.filter(item => item.type === this.config.type.slice(0, -1).toLowerCase())
		}
	},
	methods: {
		get_token() {
			let params = new URLSearchParams(window.location.hash.slice(1));
			return params.get(`access_token`);
		},
		handle_export() {
			console.log("Handling the export");
		},
		get_data(config) {
			let url = `${this.api_base}/me/top/${config.type.toLowerCase()}`;

			let limit = config.limit || 10;

			url += `?limit=${limit}&time_range=${config.duration}`;

			axios.get(
				url,
				{ headers: { Authorization: `Bearer ${this.get_token()}` } }
			).then((response) => {
				this.error = ``;
				this.config = config;
				this.data = response.data.items;
			}).catch((err) => {
				this.error = `${err.name}: ${err.message}`
			});
		},
	}
}
</script>

<style scoped>
#data_view {
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 0 auto;
	display: flex;
	width: 90%;
}
</style>