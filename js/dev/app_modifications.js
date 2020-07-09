let params = new URLSearchParams(window.location.search);
let dev_mode = !(params.get(`dev`) == null || params.get(`dev`) === `false`);
let preview = !(params.get(`preview`) == null || params.get(`preview`) === `false`);


function get_dev_data () {
	switch (this.type) {
		case `Artists`:
			this.data.artists = dev_artists;
			this.data.tracks = [];
			break;
		case `Tracks`:
			this.data.artists = [];
			this.data.tracks = dev_tracks;
			break;
		default:
			this.data.tracks = [];
			this.data.artists = [];
			break;
	}
}


if (dev_mode || preview) {
	vue_config.data.user.name = `Preview Mode`;
	vue_config.methods.get_data = get_dev_data;
	vue_config.computed.is_authed = function () { return true; };
};