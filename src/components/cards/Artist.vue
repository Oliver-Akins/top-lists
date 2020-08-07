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
				:size="200"
				:border="100"
				:primary="css_var('--missing-picture-foreground')"
				:background="css_var('--missing-picture-background')"
			/>
		</div>
		<div class="artist-info">
			<div class="title">{{ item.name }}</div>
			<div class="subtitle">{{ genres }}</div>
		</div>
		<div
			v-tooltip.auto="popularity_tooltip"
			class="popularity corner"
		>
			{{ item.popularity }}
		</div>
		<div
			v-tooltip.auto="followers_tooltip"
			class="followers corner"
		>
			{{ item.followers.total.toLocaleString() }}
		</div>
	</div>
</template>

<script>
export default {
	name: `ArtistCard`,
	components: {},
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
	data() { return {};},
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
	padding: 20px 10px 1.75em;
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
	--size: 210px;
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