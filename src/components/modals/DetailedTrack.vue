<template>
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="container"
			class="modal-container"
			@click.self="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">
					<h2 class="center">Track Information</h2>
					<div class="general-info">
						SOME INFORMATION HERE
					</div>
					<div class="separator" />
					<div class="audio-features-container">
						<div
							v-for="name in data_wanted"
							:id="`${name}-container`"
							:key="name"
							class="audio-feature"
						>
							<percent
								:size="40"
								:progress="Math.round(value * 100)"
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

export default {
	name: `DetailedTrackInfo`,
	props: {
		track: {
			type: Object,
			required: true,
		}
	},
	created() {},
	data() { return {
		container: false,
		content: false,
		data_populated: false,
		tooltips: {},
		data_points: {},
		data_wanted: [
			`acousticness`,
			`danceability`,
			`energy`,
			`instrumentalness`,
			`liveness`,
			// `loudness`,
			`speechiness`,
			`valence`
		],
	}},
	mounted() {
		this.$nextTick(function() {
			this.container = true;
			axios.get(
				`${this.api_url}/audio-features/${this.track.id}`,
				{ headers: { Authorization: `Bearer ${this.api_token}` } }
			)
			.then((response) => {
				console.log(response)
				for (var key of this.data_wanted) {
					this.data_points[key] = response.data[key]
				};
				this.data_populated = true;
			})
			.catch(err => console.error(err))
		})
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
	max-height: 85%;
	padding: 0 15px;
	z-index: 11;
	width: 90%;
}

.audio-features-container {
	justify-content: space-evenly;
	flex-direction: row;
	flex-wrap: wrap;
	display: flex;
}

.audio-feature {
	align-items: center;
	display: flex;
	padding: 5px;
	margin: 5px;
}

div.separator {
	background-color: var(--accent1);
	height: 2px;
	width: 100%;
}

@media only screen and (min-width: 768px) {
	.modal {
		width: 50%;
		max-height: 75%;
	}
}
</style>