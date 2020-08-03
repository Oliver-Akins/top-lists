<template>
	<div id="main_screen">
		<Control
			:dev="dev_mode"
			:preview="preview_mode"
			@playlist_export="handle_export"
			@data_request="get_data"
		/>
	</div>
</template>

<script>
import ControlCard from "./ControlBar.vue"

export default {
	name: `MainView`,
	props: {
		preview_mode: Boolean,
		dev_mode: Boolean,
	},
	components: {
		Control: ControlCard
	},
	data() { return {};},
	computed: {},
	methods: {
		handle_export() {
			console.log("Handling the export");
		},
		get_data() {
			console.log("Fetching data from Spotify")
		},
	}
}
</script>

<style>

</style>