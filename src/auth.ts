import { SvelteKitAuth } from "@auth/sveltekit"
import Google from '@auth/sveltekit/providers/google'
import GitHub from "@auth/sveltekit/providers/github"
import { GITHUB_ID, GITHUB_SECRET, AUTH_GOOGLE_SECRET, AUTH_GOOGLE_ID } from "$env/static/private"

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Google({ clientSecret: AUTH_GOOGLE_SECRET, clientId: AUTH_GOOGLE_ID }), GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
});
