<template id="pop-modal">
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="container"
			class="modal-container"
			@click.self="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">
					<h2 class="center">Available Themes</h2>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: `ThemesListModal`,
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