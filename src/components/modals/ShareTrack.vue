<template>
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="container"
			class="modal-container"
			@click.self.stop="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">
					<h2 class="center">Track Sharing</h2>
					<div class="share-buttons">
						<button
							@click="copy_text(track.external_urls.spotify)"
						>
							Copy Track Link
						</button>
						<button
							@click="copy_text(track.album.external_urls.spotify)"
						>
							Copy Album Link
						</button>
						<button
							v-for="artist in track.artists"
							:key="artist.uri"
							@click="copy_text(artist.external_urls.spotify)"
						>
							Copy {{ artist.name }}'s Link
						</button>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: `ShareTrack`,
	props: {
		track: {
			type: Object,
			required: true,
		},
	},
	data() {return {
		content: false,
		container: false,
	}},
	computed: {},
	mounted() {
		this.$nextTick(function() {
			this.container = true;
		});
	}
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
	max-height: 85%;
	z-index: 11;
	width: 90%;
}

.share-buttons {
	flex-direction: column;
	align-items: center;
	display: flex;
}

.share-buttons > button {
	margin-bottom: 10px;
	width: 90%;
}

@media only screen and (min-width: 768px) {
	.modal {
		width: 50%;
		max-height: 75%;
	}
	.share-buttons > button {
		width: 64%;
	}
}
</style>