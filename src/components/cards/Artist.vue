<template>
	<div class="card">
		<div class="image">
			<img
				v-if="item.images.length !== 0"
				:src="item.images[0].url"
				:alt="`${item.name}'s artist image`"
			>
			<icon
				v-else
				type="notes"
				:size="200"
				:border="100"
				:primary="'--missing-picture-foreground'"
				:background="'--missing-picture-background'"
			/>
		</div>
		<div class="artist-info">
			<div class="title">
				{{ item.name }}
			</div>
			<div class="subtitle">
				{{ item.genres.map(x => x.toTitleCase()).join(`, `) }}
			</div>
		</div>
		<div class="bottom-bar">
			<button
				v-tooltip="popularity_tooltip"
				class="popularity"
				@click="show_pop_modal = true"
			>
				{{ item.popularity }}
			</button>
			<button
				v-tooltip="share_tooltip"
				class="share"
				name="Share"
				@click="copy_text(item.external_urls.spotify)"
			>
				<icon
					type="share"
					:size="22"
					:inner-size="22"
					:primary="'--card-bottom-row-icon-colour'"
				/>
			</button>
		</div>
		<PopularityModal
			v-if="show_pop_modal"
			@close="show_pop_modal = false"
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

export default {
	name: `TrackCard`,
	components: {
		PopularityModal: PopularityModal,
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
		popularity_tooltip: `Artist Popularity`,
		share_tooltip: `Click to Copy Artist Link`,
		show_pop_modal: false,
		show_share_modal: false,
	}},
	computed: {},
	methods: {}
}
</script>

<style scoped>
.card {
	border-color: var(--card-border-colour);
	border-style: var(--card-border-style);
	border-width: var(--card-border-width);
	border-radius: var(--corner-rounding);
	background-color: var(--card-colour);
	color: var(--card-text);
	flex-direction: column;
	align-items: center;
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
	border-radius: 5px;
}

.artist-info {
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

.share {
	justify-content: center;
	align-items: center;
	cursor: pointer;
	display: flex;
}
.share:hover {
	background-color: var(--card-bottom-row-hover-background);
}


/* Setting the growth and alignments of the bottom bar buttons */
.bottom-bar > * {
	border-color: var(--card-bottom-row-divider-colour);
	padding-bottom: 2px;
	padding-top: 2px;
}
.bottom-bar > :first-child {
	border-radius: 0 0 0 var(--corner-rounding);
	border-right-style: solid;
	border-right-width: 1px;
	flex-grow: 1;
}
.bottom-bar > :last-child {
	border-radius: 0 0 var(--corner-rounding) 0;
	border-left-style: solid;
	border-left-width: 1px;
	flex-grow: 1;
}


@media only screen and (min-width: 768px) {
	.card {
		width: 230px;
		margin: 5px;
	}
}
</style>