<template>
	<div class="card">
		<div class="image"></div>
		<div class="track-info"></div>
		<div class="popularity bottom left corner"></div>
		<div class="duration bottom right corner"></div>
	</div>
</template>

<script>
export default {
	name: `TrackCard`,
	components: {},
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
	data() { return {};},
	computed: {},
	methods: {}
}
</script>

<style>

</style>