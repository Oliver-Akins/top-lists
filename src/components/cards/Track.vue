<template>
	<div class="card">
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
			<button
				class="popularity"
				v-tooltip="popularity_tooltip"
				@click="show_pop_modal = true"
			>
				{{ item.popularity }}
			</button>
			<button
				class="share"
				name="Share"
				v-tooltip="share_tooltip"
				@click="show_share_modal = true"
			>
				<icon
					type="share"
					:size="22"
					:inner-size="22"
					:primary="css_var('--card-bottom-row-icon-colour')"
				/>
			</button>
			<button
				class="information"
				name="Track Information"
				v-tooltip="info_tooltip"
				@click="show_track_info = true"
			>
				<icon
					type="info"
					:size="22"
					:inner-size="22"
					:primary="css_var('--card-bottom-row-icon-colour')"
				/>
			</button>
			<div
				class="duration"
				v-tooltip="duration_tooltip"
			>
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
		<Sharing
			v-if="show_share_modal"
			:track="item"
			@close="show_share_modal = false"
		/>
	</div>
</template>

<script>
// Import Components
import Icon from "../Icon";
import ShareModal from "../modals/ShareTrack";
import PopularityModal from "../modals/PopularityInfo";
import DetailedTrackModal from "../modals/DetailedTrack";

export default {
	name: `TrackCard`,
	components: {
		PopularityModal: PopularityModal,
		TrackInfo: DetailedTrackModal,
		Sharing: ShareModal,
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
		info_tooltip: `Audio Features`,
		share_tooltip: `Share`,
		show_pop_modal: false,
		show_track_info: false,
		show_share_modal: false,
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
	margin-bottom: 25px;
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
	display: flex;
	width: 100%;
	bottom: 0;
}
.bottom-bar > button {
	background-color: var(--card-bottom-row-background);
	color: var(--card-bottom-row-text-colour);
	font-size: initial;
	padding: 0;
}


.popularity { cursor: pointer; }
.popularity:hover { background-color: var(--card-bottom-row-hover-background); }

.information, .share {
	justify-content: center;
	align-items: center;
	cursor: pointer;
	display: flex;
}
.information:hover, .share:hover {
	background-color: var(--card-bottom-row-hover-background);
}


/* Setting the growth and alignments of the bottom bar buttons */
.bottom-bar > * {
	border-color: var(--card-bottom-row-divider-colour);
	padding-bottom: 2px;
	padding-top: 2px;
}
.bottom-bar > :nth-child(1) {
	border-radius: 0 0 0 var(--corner-rounding);
	border-right-style: solid;
	border-right-width: 2px;
	padding-left: 5%;
	text-align: left;
	flex-grow: 1;
}
.bottom-bar > :nth-child(2) {
	border-radius: 0;
	border-right-style: solid;
	border-right-width: 1px;
	text-align: center;
	flex-grow: 2;
}
.bottom-bar > :nth-child(3) {
	border-radius: 0;
	border-left-style: solid;
	border-left-width: 1px;
	text-align: center;
	flex-grow: 2;
}
.bottom-bar > :nth-child(4) {
	border-radius: 0 0 var(--corner-rounding) 0;
	border-left-style: solid;
	border-left-width: 2px;
	padding-right: 5%;
	text-align: right;
	flex-grow: 1;
}


@media only screen and (min-width: 768px) {
	.card {
		width: 230px;
		margin: 5px;
	}
}
</style>