<template id="pop-modal">
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="container"
			class="modal-container"
			@click.self="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">
					<h2 class="center">How is Popularity Calculated?</h2>
					<p class="center">
						Popularity is a value between 0 and 100 that is calculated by Spotify based on how many plays the song/artist has recieved and how recent those plays are.
					</p>
					<p class="center">
						This means that an artist/song that has had 100 plays today will have a higher popularity than a song/artist that has 100 from a month ago.
					</p>
					<p class="center">
						This number is not updated in real time so refreshing the page will not reflect it's absolute accurate value.
					</p>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: `PopularityModal`,
	data() {return {
		container: false,
		content: false,
	}},
	mounted() {
		this.$nextTick(function() {
			this.container = true;
		});
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
	text-align: center;
	max-height: 85%;
	padding: 0 15px;
	z-index: 11;
	width: 90%;
}

@media only screen and (min-width: 768px) {
	.modal {
		width: 50%;
		max-height: 75%;
	}
}
</style>