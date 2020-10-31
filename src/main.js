import Vue from 'vue';
import VTooltip from 'v-tooltip';
import * as clipboard from 'clipboard-polyfill/text';
import TextareaAutosize from 'vue-textarea-autosize';
import VueEllipseProgress from 'vue-ellipse-progress';
import App from './App.vue';
import {
	AUTH_REDIRECT,
	SPOTIFY_API_BASE,
	STORAGE_KEYS,
	HOME_PAGE
} from './js/constants';

Vue.config.productionTip = false;
VTooltip.enabled = window.innerWidth > 768

// Third-party plugins
Vue.use(VTooltip);
Vue.use(TextareaAutosize);
Vue.use(VueEllipseProgress, `percent`);

// global mixings
Vue.mixin({
	data() {return {
		api_url: SPOTIFY_API_BASE,
		auth_redirect: AUTH_REDIRECT,
		storage_key: STORAGE_KEYS,
		home_page: HOME_PAGE,
	}},
	computed: {
		api_token() {
			return sessionStorage.getItem(this.storage_key.token);
		},
	},
	methods: {
		auth_expired(error = null) {
			sessionStorage.removeItem(this.storage_key.token);
			window.location.hash = ``;
			if (error) {
				window.location.href = `${this.home_page}?error=${error}`;
			} else {
				window.location.href = this.home_page;
			};
		},
		copy_text: clipboard.writeText,
	},
});


// eslint-disable-next-line
const app = new Vue({
	render: h => h(App),
}).$mount('#app')
