import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

export const config = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
          const res = await fetch('http://0.0.0.0:8000/account/token/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: credentials?.username,
                  password: credentials?.password,
              }),
          });

          const user = await res.json();
          // console.log(user);

          if (res.status === 200) {
            return user;
          } else {
            return null;
          }
      }
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const excludedPaths = /^(\/api|\/_next\/static|\/_next\/image|\/favicon.ico)/;
      const { pathname } = request.nextUrl
      if (!excludedPaths.test(pathname)) return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
