# Spotify Top Lists
A tool for getting a user's top tracks/artists on Spotify

---

## Local Installation:
Follow the steps below for information on how to run the webpage locally.

1. Clone the repository locally
2. Create a Spotify developer app in [Spotify's Developer Dashboard](https://developer.spotify.com/dashboard/applications)
3. Change the client ID in `/src/components/LoginView.vue` to be the client ID associated with the app you just made in the Spotify developer dashboard.
4. Run one of the following commands (I prefer using `pnpm` over `npm`)
   - `pnpm install`
   - `npm install`
5. Once the above command is finished, run the corresponding serve command.
   - `pnpm serve`
   - `npm serve`
6. Go to the localhost IP in your browser, **do not try to log in yet**. (It should already be copied to your clipboard).
7. If the address copied to clipboard is not `http://localhost:8080`, you will need to modify the `/src/js/constants.js` file's `DEV_URL` to match what was copied to your clipboard.
8. Add the address exactly as it is to your Spotify application as an authentication redirect. Make sure to save the change.
9. Once this is done, you can reload the page/restart the webserver and are ready to log in.

---

## Contributing:
I appreciate any and all pull requests, so long as they follow the below guidelines that I have set:

- Indentation must be tabs. If you use spaces in your PR, it will not get merged until adjusted.
- Naming of constants is in `SCREAMING_SNAKE_CASE`
- File and component names are in `CapitalCamel`
- Naming of everything else is in `snake_case`
- Component names should be as short as possible, while still maintaining a high level of clarity as to what it is.
- If in doubt about something, open an issue, or comment on an already existing, related issue mentioning @Oliver-Akins