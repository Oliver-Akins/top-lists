<template>
	<div id="main_screen">
		<Control
			:dev="dev_mode"
			:preview="preview_mode"
			:api_url="api_base"
			:token="get_token()"
			:data_exists="data.length !== 0"
			@playlist_export="handle_export"
			@data_request="get_data"
		/>
		<div v-if="error" class="error">{{ error }}</div>
		<div v-else id="data_view">
			<span
				v-for="item in data"
				:key="item.uri"
			>
				<Track
					v-if="item.type === 'track'"
					:item="item"/>
				<Artist
					v-else-if="item.type === 'artist'"
					:item="item"/>
				<Unknown v-else :item="item"/>
			</span>
		</div>
	</div>
</template>

<script>
import * as axios from "axios";
import ControlCard from "./ControlBar.vue";
import ArtistCard from "./cards/Artist.vue";
import TrackCard from "./cards/Track.vue";
import UnknownTypeCard from "./cards/UnknownType.vue";

export default {
	name: `MainView`,
	props: {
		preview_mode: Boolean,
		dev_mode: Boolean,
	},
	components: {
		Control: ControlCard,
		Track: TrackCard,
		Artist: ArtistCard,
		Unknown: UnknownTypeCard,
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

<style scoped>
#data_view {
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 0 auto;
	display: flex;
	width: 90%;
}

.card {
	background-color: var(--card-colour);
	border-radius: var(--border-radius);
	color: var(--card-text);
	padding: 20px 10px 10px;
	flex-direction: column;
	border-style: none;
	position: relative;
	margin: 5px auto;
	display: flex;
	width: 90%;
}


@media only screen and (min-width: 768px) {
	.card {
		width: 230px;
		margin: 5px;
	}
}
</style>