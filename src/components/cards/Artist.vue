<template>
	<div class="card">
		<div class="image">
			<img
				v-if="item.images.length !== 0"
				:src="item.images[0].url"
				:alt="`${item.name} profile image`"
			>
			<icon
				v-else
				type="notes"
				:size="230"
				:border="115"
				:primary="'--missing-picture-foreground'"
				:background="'--missing-picture-background'"
			/>
		</div>
		<div class="artist-info">
			<div class="title">{{ item.name }}</div>
			<div class="subtitle">{{ genres }}</div>
		</div>
		<div
			v-tooltip.auto="popularity_tooltip"
			class="popularity corner"
			@click.self="show_pop_modal = true"
		>
			{{ item.popularity }}
		</div>
		<div
			v-tooltip.auto="followers_tooltip"
			class="followers corner"
		>
			{{ item.followers.total.toLocaleString() }}
		</div>
		<PopularityModal
			v-if="show_pop_modal"
			@close="show_pop_modal = false"
		/>
	</div>
</template>

<script>
// Import Components
import Icon from "../Icon";
import PopularityModal from "../modals/PopularityInfo.vue";

export default {
	name: `ArtistCard`,
	components: {
		PopularityModal: PopularityModal,
		icon: Icon,
	},
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
	data() { return {
		followers_tooltip: `Total Followers`,
		popularity_tooltip: `Artist Popularity`,
		show_pop_modal: false,
	}},
	computed: {
		genres() {
			let genres = [];
			for (var genre of this.item.genres) {
				genres.push(genre.toTitleCase());
			};
			return genres.join(`, `);
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
	border-radius: var(--corner-rounding);
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

.followers {
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