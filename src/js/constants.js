const DEV_URL = `http://localhost:8080`;
const PROD_URL = `https://oliver.akins.me/top-lists`;

export const HOME_PAGE = process.env.NODE_ENV === `production`
	? PROD_URL
	: DEV_URL

export const AUTH_REDIRECT = `${HOME_PAGE}`

export const SPOTIFY_API_BASE = `https://api.spotify.com/v1`;

export const STORAGE_KEYS = {
	token: `top-lists-auth-token`,
	state: `top-lists-auth-state`
};