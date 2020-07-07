Vue.component(
	`artist`,
	{
		props: [ `artist` ],
		data: function () {
			return {
				popularity_tooltip: `Popularity`,
				followers_tooltip: `Followers`,
			};
		},
		computed: {
			genres: function () {
				let genres = [];
				for (var genre of this.artist.genres) {
					genres.push(genre.toTitleCase());
				};
				return genres.join(`, `);
			}
		},
		template: `<div class="card">
	<div class="image">
		<img v-id="artist.image" :src="artist.image.url" :alt="artist.name + 's profile picture'" target="_blank" rel="noopener">
		<div class="missing-image" v-else>
			<music-note colour="#1DB954"></music-note>
		</div>
	</div>
	<div class="info">
		<span class="title">
			<a :href="artist.link" target="_blank" rel="noopener">{{artist.name}}</a>
		</span>
		<br>
		<span class="subtitle">{{genres}}</span>
	</div>
	<div class="bottom left corner popularity" v-tooltip="popularity_tooltip">{{artist.popularity}}</div>
	<div class="bottom right corner followers" v-tooltip="followers_tooltip">{{artist.follower_count}}</div>
</div>`
	}
)