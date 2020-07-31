<template>
	<div id="control">
		<div
			v-if="user.name || dev || preview"
			id="user_data"
		>
			{{ user.name }}
		</div>
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
				v-model="amount"
				type="number"
				min="1"
				max="50"
				placeholder="How many?"
				@input="verify_request_amount()"
			>
		</div>
		<div
			v-if="type && duration && !error"
			id="data_button"
		>
			<button @click.self="data_request()">
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
		<div v-if="error" id="error">
			{{ error }}
		</div>
	</div>
</template>

<script>
export default {
	name: `ControlBar`,
	props: {
		data_exists: Boolean,
		dev: Boolean,
		preview: Boolean,
	},
	components: {},
	data() { return {
		error: ``,
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
			let pre_text = `Get Top`;
			switch (this.amount) {
				case "":
					return `${pre_text} 10 ${this.type}`;
				case "1":
					return `${pre_text} ${this.type.slice(0, -1)}`;
				default:
					return `${pre_text} ${this.amount} ${this.type}`;
			}
		}
	},
	methods: {
		event(name) { this.$emit(name); },
		get_user() {},
		verify_request_amount() {
			let amount;
			try {
				amount = parseInt(this.amount)
			} catch (err) {
				this.error = err
				return;
			};

			if (amount > 50) {
				this.error = `Cannot request more than 50 ${this.type.toLowerCase()}`;
				return;
			} else if (amount < 1) {
				this.error = `Cannot get 0 or fewer ${this.type.toLowerCase()}`;
				return;
			} else {
				this.error = ``;
				return amount;
			}
		},
		data_request() {
			let amount = parseInt(this.amount);
			if (amount) {
				this.event(`data_request`, {
					type: this.type,
					amount: amount,
					duration: this.duration,
				});
			};
		},
	}
}
</script>

<style>
#control {
	border-radius: var(--corner-rounding);
	background-color: var(--card-colour);
	justify-content: space-evenly;
	padding: 15px 15px 5px;
	flex-direction: column;
	align-items: center;
	margin: 15px auto;
	flex-wrap: wrap;
	display: flex;
	width: 90%;
}

#control > div {
	margin-bottom: 10px;
}

#error {
	border-radius: var(--corner-rounding);
	border-color: var(--error);
	border-style: solid;
	color: var(--error);
	text-align: center;
	border-width: 2px;
	padding: 10px;
	height: 25px;
	width: 90%;
}

@media only screen and (min-width: 768px) {
	#control {
		flex-direction: row;
		flex-wrap: wrap;
	}
}
</style>