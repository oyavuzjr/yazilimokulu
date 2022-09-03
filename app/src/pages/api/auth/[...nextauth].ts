import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    redirect: async ({ url }) => {
      if (url === "/user") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // jwt: {
  //   encryption: true,
  // },
  secret: process.env.NEXT_SECRET as string,
};

export default NextAuth(authOptions);
