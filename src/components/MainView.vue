<template>
	<div id="main_screen">
		<Control
			@export-attempt="handle_export"
		/>
	</div>
</template>

<script>
import ControlCard from "./ControlBar.vue"

export default {
	name: ``,
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