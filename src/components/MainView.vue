<template>
	<div id="main_screen">
		<Control
			:dev="dev_mode"
			:preview="preview_mode"
			:auth_redirect="auth_redirect"
			:data_exists="data.length !== 0"
			:is_track_data="config.type === 'Tracks'"
			@playlist_export="playlist_export_modal = true"
			@user_id="user_id = $event"
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
		<PlaylistExport
			v-if="playlist_export_modal"
			:data="data"
			:config="config"
			:user_id="user_id"
			@close="playlist_export_modal = false"
		/>
	</div>
</template>

<script>
import * as axios from "axios";
import ControlCard from "./ControlBar";
import ArtistCard from "./cards/Artist";
import TrackCard from "./cards/Track";
import PlaylistExport from "./modals/PlaylistExport";

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
		}
	},
	components: {
		Control: ControlCard,
		Track: TrackCard,
		Artist: ArtistCard,
		PlaylistExport: PlaylistExport,
	},
	data() { return {
		config: {},
		data: [],
		error: ``,
		playlist_export_modal: false,
		user_id: null,
	};},
	computed: {
		items() {
			return this.data.filter(item => item.type === this.config.type.slice(0, -1).toLowerCase())
		}
	},
	methods: {
		get_data(config) {
			let url = `${this.api_url}/me/top/${config.type.toLowerCase()}`;

			let limit = config.limit;

			url += `?limit=${limit}&time_range=${config.duration}`;

			axios.get(
				url,
				{ headers: { Authorization: `Bearer ${this.api_token}` } }
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