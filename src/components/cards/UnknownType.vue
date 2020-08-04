<template>
	<div class="card">
		Unknown Type: {{ item.type }}
	</div>
</template>

<script>
export default {
	name: `UnknownTypeCard`,
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