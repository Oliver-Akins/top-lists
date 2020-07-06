Vue.component(
	`artist`,
	{
		props: [ `artist` ],
		data: function () {
			return {};
		},
		computed: {},
		template: `<div class="artist">
	<div class="image profile_pic">
		<img :src="artist.image.url" :alt="artist.name + \`'s profile picture\`">
	</div>
	<div class="info">
		<span class="name">
			<a :href="artist.link" target="_blank" rel="noopener">{{artist.name}}</a>
		</span>
		<br>
		<span class="genres">{{artist.genres.join(", ")}}</span>
	</div>
	<div class="popularity">{{artist.popularity}}</div>
	<div class="followers">{{artist.follower_count}}</div>
</div>`
	}
)