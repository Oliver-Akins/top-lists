Vue.component(
	`track-card`,
	{
		props: [ `track` ],
		data: function () {
			return {
				popularity_tooltip: `Popularity`
			}
		},
		computed: {
			duration: function () {
				let timestamp = ``;

				// Converting to seconds
				let duration = Math.trunc(this.track.duration / 1000);
				let seconds = duration % 60;

				// Converting to minutes
				duration = Math.trunc(duration / 60);
				let minutes = duration % 60

				// Converting to hours
				duration = Math.trunc(duration / 60);
				let hours = duration % 24;

				if (seconds < 10) {
					seconds = `0${seconds}`
				};

				return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds}`;
			},
			artists: function () {
				let artists = [];
				for (var artist of this.track.artists) {
					artists.push(
						`<a href="${artist.external_urls.spotify}" target="_blank" rel="noopener">${artist.name}</a>`
					)
				}
				return artists.join(`, `)
			},
		},
		template: `<div class="card">
	<div class="image">
		<a v-if="track.album.image.url"  :href="track.album.link" target="_blank" rel="noopener">
			<img :src="track.album.image.url" :alt="track.album.name + ' Cover Image'" class="cover">
		</a>
		<a v-else :href="track.album.link" target="_blank" rel="noopener">
			<div class="missing-image">
				<music-note colour="#1DB954"></music-note>
			</div>
		</a>
	</div>
	<div class="info">
		<span class="title remote" v-if="!track.locality">
			<a :href="track.link" target="_blank" rel="noopener">{{track.name}}</a>
		</span>
		<span class="title local" v-else>{{track.name}}</span>
		<br>
		<span class="subtitle" v-html="artists"></span>
	</div>
	<div class="popularity bottom left corner" v-tooltip="popularity_tooltip">{{track.popularity}}</div>
	<div class="duration bottom right corner">{{duration}}</div>
</div>`
	}
);