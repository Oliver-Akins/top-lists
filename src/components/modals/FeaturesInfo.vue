<template>
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="container"
			class="modal-container"
			@click.self.stop="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">

					<h2 v-if="feature === 'all'">Audio Features Information</h2>
					<h2 v-else>{{ feature.toTitleCase() }} Information</h2>

					<div v-if="is_feature('acousticness')">
						<h3 v-if="feature === 'all'">Acousticness</h3>
						<p>
							This is the confidence that the track is acoustic or
							not, 100 means that Spotify feels strongly that this
							track is acoustic.
						</p>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('danceability')">
						<h3 v-if="feature === 'all'">Danceability</h3>
						<p>
							A value of 0.0 is least danceable and 1.0 is most danceable.

							The danceability of a track is an indication of how
							well a track can be danced to. A value closer to 0
							is least danceable, and 100 is most danceable. This
							is based on a combination of multiple factors
							including:
						</p>
						<ul>
							<li>Tempo</li>
							<li>Rhythm stability</li>
							<li>Beat strength</li>
						</ul>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('energy')">
						<h3 v-if="feature === 'all'">Energy</h3>
						<p>
							Description
						</p>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('instrumentalness')">
						<h3 v-if="feature === 'all'">Instrumentalness</h3>
						<p>
							Description
						</p>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('liveness')">
						<h3 v-if="feature === 'all'">Liveness</h3>
						<p>
							Description
						</p>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('loudness')">
						<h3 v-if="feature === 'all'">Loudness</h3>
						<p>
							Description
						</p>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('speechiness')">
						<h3 v-if="feature === 'all'">Speechiness</h3>
						<p>
							Description
						</p>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('valence')">
						<h3 v-if="feature === 'all'">Valence</h3>
						<p>
							Description
						</p>
					</div>

					<div class="separator" v-if="feature === 'all'" />

					<div v-if="is_feature('Popularity')">
						<h3 v-if="feature === 'all'">Popularity</h3>
						<p>
							Description
						</p>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: `TrackFeaturesInformation`,
	props: {
		feature: {
			type: String,
			required: false,
			default: "all"
		}
	},
	created() {},
	data() {return {
		content: false,
		container: false,
	}},
	mounted() {
		this.$nextTick(function() {
			this.container = true;
		})
	},
	methods: {
		is_feature(type) {
			if (this.feature === `all`) { return true; };
			return type === this.feature;
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
	text-align: center;
	overflow-y: auto;
	max-height: 85%;
	z-index: 11;
	width: 90%;
}

@media only screen and (min-width: 768px) {
	.modal {
		max-height: 75%;
		width: 50%;
	}
}
</style>