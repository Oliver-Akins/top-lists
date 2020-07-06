function fetch_data () {
	let url = `${this.api_base}/me/top/${this.type.toLowerCase()}`;

	let limit = parseInt(this.count);
	if (!limit) { limit = 10; };

	url += `?limit=${limit}&time_range=${this.duration}`;

	axios.get(
		url,
		{ headers: { Authorization: `Bearer ${this.get_token()}` } }
	).then((response) => {
		this.data.artists = [];
		this.data.tracks = [];
		this.error.main = ``;
		switch (this.type) {
			case `Tracks`:
				for (var track of response.data.items) {
					this.data.tracks.push({
						name: track.name,
						popularity: track.popularity,
						artists: track.artists,
						link: track.external_urls.spotify,
						duration: track.duration_ms,
						locality: track.is_local,
						id: track.uri,
						album: {
							name: track.album.name,
							image: track.album.images[1],
							link: track.album.external_urls.spotify
						}
					});
				};
				break;

			case `Artists`:
				for (var artist of response.data.items) {
					this.data.artists.push({
						name: artist.name,
						id: artist.id,
						popularity: artist.popularity,
						follower_count: artist.followers.total,
						image: artist.images[1],
						genres: artist.genres,
						link: artist.external_urls.spotify
					});
				};
				break;

			default:
				this.error.main = `TypeError: ${this.type} is not a supported category`;
				break
		};
	}).catch((err) => {
		this.error.main = `${err.name}: ${err.message}`
	})
}