<template>
	<div id="control">
		<div
			v-if="username"
			id="user_data"
		>
			<img
				v-if="user.image"
				class="profile_image"
				:src="user.image"
				:alt="`${user.name}'s profile picture`"
				:width="img_size"
				:height="img_size"
			>
			<icon
				v-else
				type="notes"
				:size="img_size"
				:border="Math.floor(img_size / 2)"
				:primary="css_var('--missing-picture-foreground')"
				:background="css_var('--missing-picture-background')"
			/>
			{{ username }}
		</div>
		<div id="type">
			<select v-model="type" @change="verify_request_amount()">
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
			<button @click.self="event('playlist_export')">
				Export Playlist
			</button>
		</div>
		<div v-if="error" id="error">
			{{ error }}
		</div>
	</div>
</template>

<script>
import * as axios from "axios";
import Icon from "./Icon.vue";

export default {
	name: `ControlBar`,
	props: {
		data_exists: Boolean,
		dev: Boolean,
		preview: Boolean,
		api_url: String,
		token: String,
	},
	components: {
		icon: Icon,
	},
	data() { return {
		img_size: 50,
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
		username() {
			if (this.user.name) {
				return this.user.name;
			} else if (this.dev) {
				return `Developer Mode`;
			} else if (this.preview) {
				return `Preview Mode`;
			} else {
				return ``;
			};
		},
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
		event(name, data=null) { this.$emit(name, data); },
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
			this.event(`data_request`, {
				type: this.type,
				amount: this.amount || `10`,
				duration: this.duration,
			});
		},
	},
	mounted: function() {
		this.$nextTick(function() {
			axios.get(
				`${this.api_url}/me`,
				{ headers: { Authorization: `Bearer ${this.token}` } }
			).then((response) => {
				if (response.error) {
					window.location.hash = ``;
					window.location.href = `${this.auth.redirect}?error=${encodeURI(response.error)}`;
					return
				}
				let data = response.data;

				// Set the Vue user object
				this.user.name = data.display_name;
				this.user.image = data.images.length > 0 ? data.images[0].url : ``;

			}).catch((err) => {
				window.location.hash = ``;
				window.location.href = `${this.auth.redirect}?error=${encodeURI(err)}`;;
				return
			})
		});
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

img.profile_image {
	vertical-align: middle;
	border-radius: 50%;
}

@media only screen and (min-width: 768px) {
	#control {
		flex-direction: row;
	}
}
</style>