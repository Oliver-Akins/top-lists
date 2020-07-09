var vue_config = {
	el: `#app`,
	data: {
		api_base: `https://api.spotify.com/v1`,
		duration: ``,
		type: ``,
		count: ``,
		show: {
			popularity_popup: false,
			popularity_hover: false,
			follower_hover: false,
			modal_content: false,
			modal: {
				popularity: false,
				track: false,
				artist: false,
				playlist_export: false,
			}
		},
		error: {
			main: ``,
			auth: ``,
		},
		auth: {
			alert: `We will only be able to access your top tracks and artists, nothing else. This is also only done on your browser. Our servers do not see any of the data from your account.`,
			base_url: `https://accounts.spotify.com/authorize`,
			redirect: `http://localhost:5000`,
			client_id: `3a1795e9d55445b0aa0c05dd74c866fb`,
			scopes: [
				`user-top-read`
			],
			show_dialog: false,
			use_state: true
		},
		user: {
			name: ``,
			image: ``
		},
		data: {
			tracks: [],
			artists: []
		}
	},
	computed: {
		spotify_auth_url: auth_url,
		is_authed: verify_auth,
		button_type: get_button_text,
	},
	methods: {
		get_token: function () {
			let params = new URLSearchParams(window.location.hash.slice(1));
			return params.get(`access_token`);
		},
		get_user: function () {
			axios.get(
				`${this.api_base}/me`,
				{ headers: { Authorization: `Bearer ${this.get_token()}` } }
			).then((response) => {
				if (response.error) {
					window.location.hash = ``;
					window.location.href = this.auth.redirect;
					return
				}
				let data = response.data;

				// Set the Vue user object
				this.user.name = data.display_name;
				this.user.image = data.images.length > 0 ? data.images[0].url : ``;

			}).catch((err) => {
				window.location.hash = ``;
				window.location.href = this.auth.redirect;
				return
			})
		},
		get_data: fetch_data,
		hide_modal: function () {
			this.show.modal.popularity = false;
			this.show.modal.track = false;
			this.show.modal.artist = false;
			this.show.modal.playlist_export = false;
		}
	}
};