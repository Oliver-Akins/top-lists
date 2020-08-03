<template>
	<div id="main_screen">
		<Control
			:dev="dev_mode"
			:preview="preview_mode"
			@export-attempt="handle_export"
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
			alert("Potato")
		}
	}
}
</script>

<style>

</style>