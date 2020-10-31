<template id="theme-modal">
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="container"
			class="modal-container"
			@click.self.stop="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">
					<h2 class="center">Available Themes</h2>
					<div
						v-for="theme of available_themes"
						:key="theme.filename"
						class="theme-card"
						@click.stop="chosen_theme = theme.filename"
					>
						<h3>
							<input
								:id="'select_theme' + theme.filename"
								v-model="chosen_theme"
								type="radio"
								:value="theme.filename"
							>
							<label :for="'select_theme' + theme.filename">{{ theme.name }}</label>
						</h3>
						<p>
							{{ theme.description }}
						</p>
					</div>
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
		chosen_theme: `dark`,
		default_theme: `dark`,
		themes: [
			{
				name: `Dark`,
				filename: `dark`,
				description: `The default theme of the website, this uses darker background colours with lighter coloured accents.`,
				show() { return true },
			},
			{
				name: `Light`,
				filename: `light`,
				description: `A light theme for the website, this uses lighter background colours with darker accent colours.`,
				show() { return true },
			},
			{
				name: `Halloween`,
				filename: `halloween`,
				description: `This elusive theme only shows up around Halloween, make sure to use it while you can!`,
				show() {
					let date = new Date();
					return date.getMonth() == 9;
				},
			},
			{
				name: `High Contrast (Dark)`,
				filename: `dark-high-contrast`,
				description: `This theme is designed to be as high contrast as possible for those who need it.`,
				show() { return true },
			}
		]
	}},
	mounted() {
		this.chosen_theme = localStorage.getItem(`tl-theme`) || this.default_theme;
		this.$nextTick(function() {
			this.container = true;
		});
	},
	computed: {
		available_themes() {
			let themes = [];

			for (var theme of this.themes) {
				if (theme.show()) {
					themes.push(theme);
				};
			};

			return themes;
		},
	},
	watch: {
		chosen_theme(val) {
			localStorage.setItem(`tl-theme`, val);
			document.getElementById(`theme`).href = `/static/css/theme/${val}.css`;
		}
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