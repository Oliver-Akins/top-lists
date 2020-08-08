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
		<div
			v-tooltip.auto="popularity_tooltip"
			class="popularity corner"
			@click.self="show_pop_modal = true"
		>
			{{ item.popularity }}
		</div>
		<div
			v-tooltip.auto="duration_tooltip"
			class="duration corner"
		>
			{{ duration }}
		</div>
		<PopularityModal
			v-if="show_pop_modal"
			@close="show_pop_modal = false"
		/>
	</div>
</template>

<script>
// Import Components
import PopularityModal from "../modals/PopularityInfo.vue";

export default {
	name: `TrackCard`,
	components: {
		PopularityModal: PopularityModal,
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
	padding: 10px 10px 1.75em;
	color: var(--card-text);
	flex-direction: column;
	align-items: center;
	border-style: none;
	position: relative;
	margin: 5px auto;
	display: flex;
	width: 90%;
}


img {
	--size: 230px;
	width: var(--size);
	height: var(--size);
}

.title {
	text-align: center;
	font-size: larger;
}

.subtitle {
	text-align: center;
	font-size: smaller;
}

.corner {
	background-color: var(--on-card-colour);
	color: var(--on-card-text);
	position: absolute;
	padding: 1px 6px;
}

.popularity {
	border-radius: 0 var(--corner-rounding) 0 var(--corner-rounding);
	bottom: 0;
	left: 0;
}
.popularity:hover {
	cursor: pointer;
}

.duration {
	border-radius: var(--corner-rounding) 0 var(--corner-rounding) 0;
	bottom: 0;
	right: 0;
}

@media only screen and (min-width: 768px) {
	.card {
		width: 230px;
		margin: 5px;
	}
}
</style>