<template>
	<div class="card" @click="show_track_info = true">
		<div class="image">
			<img
				v-if="item.album.images.length !== 0"
				:src="item.album.images[0].url"
				:alt="`${item.album.name} cover art`"
			>
			<icon
				v-else
				type="notes"
				:size="200"
				:border="100"
				:primary="css_var('--missing-picture-foreground')"
				:background="css_var('--missing-picture-background')"
			/>
		</div>
		<div class="track-info">
			<div class="title">{{ item.name }}</div>
			<div class="subtitle">
				{{ item.artists.map(x => x.name).join(`, `) }}
			</div>
		</div>
		<div class="bottom-bar">
			<div class="popularity">
				{{ item.popularity }}
			</div>
			<div class="share">
				<icon
					type="share"
					:size="25"
					:inner-size="25"
					:primary="css_var('--card-bottom-row-icon-colour')"
				/>
			</div>
			<div class="information">
				<icon
					type="info"
					:size="25"
					:inner-size="25"
					:primary="css_var('--card-bottom-row-icon-colour')"
				/>
			</div>
			<div class="duration">
				{{ duration }}
			</div>
		</div>
		<PopularityModal
			v-if="show_pop_modal"
			@close="show_pop_modal = false"
		/>
		<TrackInfo
			v-if="show_track_info"
			:track="item"
			@close="show_track_info = false"
		/>
	</div>
</template>

<script>
// Import Components
import Icon from "../Icon";
import PopularityModal from "../modals/PopularityInfo.vue";
import DetailedTrackModal from "../modals/DetailedTrack.vue";

export default {
	name: `TrackCard`,
	components: {
		PopularityModal: PopularityModal,
		TrackInfo: DetailedTrackModal,
		icon: Icon,
	},
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
	data() { return {
		duration_tooltip: `Song Duration`,
		popularity_tooltip: `Song Popularity`,
		show_pop_modal: false,
		show_track_info: false,
	}},
	computed: {
		duration() {
			let timestamp = ``;

			// Converting to seconds
			let duration = Math.trunc(this.item.duration_ms / 1000);
			let seconds = duration % 60;

			// Converting to minutes
			duration = Math.trunc(duration / 60);
			let minutes = duration % 60

			// Converting to hours
			duration = Math.trunc(duration / 60);
			let hours = duration % 24;

			if (seconds < 10) {
				seconds = `0${seconds}`
			};

			return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds}`;
		}
	},
	methods: {}
}
</script>

<style scoped>
.card {
	border-radius: var(--corner-rounding);
	background-color: var(--card-colour);
	color: var(--card-text);
	flex-direction: column;
	align-items: center;
	border-style: none;
	position: relative;
	margin: 5px auto;
	display: flex;
	padding: 10px;
	width: 90%;
}


img {
	--size: 230px;
	width: var(--size);
	height: var(--size);
}

.track-info {
	justify-content: center;
	flex-direction: column;
	margin-bottom: 1.25em;
	display: flex;
	height: 100%;
}

.title {
	text-align: center;
	font-size: larger;
}

.subtitle {
	text-align: center;
	font-size: smaller;
}

.bottom-bar {
	border-radius: 0 0 var(--corner-rounding) var(--corner-rounding);
	background-color: var(--card-bottom-row-background);
	color: var(--card-bottom-row-text-colour);
	justify-content: space-between;
	position: absolute;
	padding-right: 5%;
	padding-left: 5%;
	display: flex;
	width: 90%;
	bottom: 0;
}

/* Setting the growth and alignments of the bottom bar buttons */
.bottom-bar > div {
	border-color: var(--card-bottom-row-divider-colour);
	padding-bottom: 2px;
	padding-top: 2px;
}
.bottom-bar > :nth-child(1) {
	border-right-style: solid;
	border-width: 2px;
	flex-grow: 1;
}
.bottom-bar > :nth-child(2) {
	border-right-style: solid;
	text-align: center;
	border-width: 1px;
	flex-grow: 2;
}
.bottom-bar > :nth-child(3) {
	border-left-style: solid;
	text-align: center;
	border-width: 1px;
	flex-grow: 2;
}
.bottom-bar > :nth-child(4) {
	border-left-style: solid;
	text-align: right;
	border-width: 2px;
	flex-grow: 1;
}


@media only screen and (min-width: 768px) {
	.card {
		width: 230px;
		margin: 5px;
	}
}
</style>