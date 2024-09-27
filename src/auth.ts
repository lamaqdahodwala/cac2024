import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from '@auth/sveltekit/providers/github';
import { GITHUB_ID, GITHUB_SECRET, AUTH_GOOGLE_SECRET, AUTH_GOOGLE_ID } from '$env/static/private';
import { prisma } from '$lib/db';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Google({ clientSecret: AUTH_GOOGLE_SECRET, clientId: AUTH_GOOGLE_ID }),
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async jwt(params) {
			let user = await prisma.user.findUnique({
				where: {
					id: params.user.id
				}
			});
			return { ...params.token, role: user?.role };
		},
    async session(params){
      return { 
        user: {
          name: params.session.user.name, 
          email: params.session.user.email, 
          role: params.session.user.role
        },
        expires: params.session.expires
      }
    }
	}
});
