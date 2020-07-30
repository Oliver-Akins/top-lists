<template>
	<div id="control">
		<div id="user_data"></div>
		<div id="type">
			<select v-model="type">
				<option value="" disabled>Select a Type</option>
				<option>Tracks</option>
				<option>Artists</option>
			</select>
		</div>
		<div id="duration">
			<select v-model="duration">
				<option value="" disabled>Select a Duration</option>
				<option value="short_term">~4 Weeks</option>
				<option value="medium_term">~6 Months</option>
				<option value="long_term">Several Years</option>
			</select>
		</div>
		<div id="amount">
			<input
				type="number"
				min="1"
				max="50"
				placeholder="How many?"
				v-model="amount"
			>
		</div>
		<div
			v-if="type && duration"
			id="data_button"
		>
			<button @click.self="event('data_request')">
				{{ button_text }}
			</button>
		</div>
		<div
			v-if="type === 'Tracks' && data_exists"
			id="playlist_button"
		>
			<button @click.self="event('export-attempt')">
				Export Playlist
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: `ControlBar`,
	props: [
		'data_exists'
	],
	components: {},
	data() { return {
		user: {
			name: ``,
			image: ``,
		},
		type: ``,
		duration: ``,
		amount: ``,
	};},
	computed: {
		button_text() {
			switch (this.amount) {
				case "":
					return `Get top 10 ${this.type}`;
				case "1":
					return `Get top ${this.type.slice(0, -1)}`;
				default:
					return `Get top ${this.amount} ${this.type}`;
			}
		}
	},
	methods: {
		event(name) { this.$emit(name); },
		get_user() {},
	}
}
</script>

<style scoped>
#control {
	border-radius: var(--corner-rounding);
	background-color: var(--card-colour);
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	margin: 15px auto;
	display: flex;
	padding: 15px;
	width: 90%;
}

select {
	background-color: var(--select-background);
	border-radius: var(--corner-rounding);
	font-family: var(--fonts);
	color: var(--select-text);
	outline: none;
	padding: 15px;
	border: none;
}
select:hover { cursor: pointer; }
</style>