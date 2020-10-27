<template>
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="container"
			class="modal-container"
			@click.self.stop="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">
					<h2 @click.self="show_all_feature_info = true">
						"{{ track.name }}" Information
						<div
							class="release-date"
						>
							<span
								v-tooltip="release_date_tooltip"
							>
								{{ track.album.release_date.replace(/-/g, `/`) }}
							</span>
						</div>
					</h2>
					<div class="audio-features-container">
						<div
							v-for="name in data_wanted"
							:id="`${name}-container`"
							:key="name"
							class="audio-feature"
						>
							<percent
								:size="40"
								:progress="get_percentage(name)"
								:color="css_var('--percent-filled')"
								:empty-color="css_var('--percent-empty')"
								:loading="!data_populated"
								:font-color="css_var('--percent-text')"
								:half="true"
							/>
							{{ name.toTitleCase() }}
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
import * as axios from "axios";
import TrackAudioFeatureInfo from "./FeaturesInfo.vue";

export default {
	name: `DetailedTrackInfo`,
	components: {},
	props: {
		track: {
			type: Object,
			required: true,
		}
	},
	data() { return {
		container: false,
		content: false,
		show_feature_info: false,
		show_all_feature_info: false,
		data_populated: false,
		data_points: {},
		data_wanted: [
			`acousticness`,
			`danceability`,
			`energy`,
			`instrumentalness`,
			`liveness`,
			`loudness`,
			`speechiness`,
			`valence`,
			`popularity`,
		],
		months: {
			"01": "January",
			"02": "Febuary",
			"03": "March",
			"04": "April",
			"05": "May",
			"06": "June",
			"07": "July",
			"08": "August",
			"09": "September",
			"10": "October",
			"11": "November",
			"12": "December",
		}
	}},
	mounted() {
		this.$nextTick(function() {
			this.container = true;
			axios.get(
				`${this.api_url}/audio-features/${this.track.id}`,
				{ headers: { Authorization: `Bearer ${this.api_token}` } }
			)
			.then((response) => {
				for (var key of this.data_wanted) {
					this.data_points[key] = response.data[key]
				};
				this.data_populated = true;
			})
			.catch(err => {
				if (err.response.status == 401) {
					return this.auth_expired(err);
				};
				console.error(err);
			});
		})
	},
	computed: {
		release_date_tooltip() {
			let parts = this.track.album.release_date.split(`-`);
			switch (this.track.album.release_date_precision) {
				case `year`:
					return release[0];
				case `month`:
					return `${this.months[parts[1]]}, ${parts[0]}`
				case `day`:
					return `${this.months[parts[1]]} ${parts[2]}, ${parts[0]}`
				default:
					return ``;
			};
		},
	},
	methods: {
		get_percentage(key) {
			let value = this.data_points[key];

			// Calculate data value
			switch (key) {
				case `loudness`:
					return Math.round((10 ** (value / 10) * 100));
				case `popularity`:
					return this.track.popularity;
				default:
					return Math.round(value * 100);
			};
		},
	},
}
</script>

<style scoped>
.modal-container {
	background-color: var(--modal-container-background);
	justify-content: center;
	align-items: center;
	position: fixed;
	display: flex;
	height: 100vh;
	width: 100vw;
	z-index: 10;
	left: 0;
	top: 0;
}

.modal {
	background-color: var(--modal-background);
	border-radius: var(--corner-rounding);
	padding: 0 15px 15px 15px;
	color: var(--modal-text);
	overflow-y: auto;
	max-height: 85%;
	z-index: 11;
	width: 90%;
}

h2 {
	text-align: center;
	position: relative;
}

.release-date {
	position: absolute;
	font-size: 0.6em;
	width: 100%;
}

.audio-features-container {
	justify-content: space-evenly;
	flex-direction: column;
	flex-wrap: wrap;
	display: flex;
}

.audio-feature {
	padding: 5px 5px 5px 27vw;
	align-items: center;
	display: flex;
	margin: 5px;
}

@media only screen and (min-width: 768px) {
	.modal {
		max-height: 75%;
		width: 50%;
	}
	.audio-features-container {
		flex-direction: row;
	}
	.audio-feature {
		padding: 5px;
	}
}
</style>