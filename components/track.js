Vue.component(
	`track-card`,
	{
		props: [ `track` ],
		data: function () {
			return {
				popularity_tooltip: `Popularity.\nClick for more information.`
			}
		},
		template: `<div class="track">
	<div class="cover center">
		<a :href="track.album.link" target="_blank" rel="noopener">
			<img :src="track.album.image.url" :alt="track.album.name + ' Cover Image'" class="cover">
		</a>
	</div>
	<div class="info">
		<span class="name remote" v-if="!track.locality">
			<a :href="track.link" target="_blank" rel="noopener">{{track.name}}</a>
		</span>
		<span class="name local" v-else>
			{{track.name}}
		</span>
		<br>
		<span class="artist" v-html="artists"></span>
		<br>
	</div>
	<div class="popularity" v-tooltip="popularity_tooltip">{{track.popularity}}</div>
	<div class="duration">{{duration}}</div>
</div>`,
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
		}
	}
);