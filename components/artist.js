Vue.component(
	`artist`,
	{
		props: [ `artist` ],
		computed: {},
		template: `<div class="artist">
	<div class="image profile_pic" v-if="artist.image">
		<img :src="artist.image.url" :alt="artist.name + 's profile picture'">
	</div>
	<div class="image profile_pic" v-else>
		<div class="missing-circle">
			<music-note colour="#1DB954"></music-note>
		</div>
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