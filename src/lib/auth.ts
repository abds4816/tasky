import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "./prismadb";
import GoogleProvider from "next-auth/providers/google"

export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(db) as any,
    pages: {
        signIn: '/login',
      },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID!! as string,
            clientSecret:process.env.GOOGLE_SECRET!! as string,
        })
    ],
    callbacks: {
        async session({ token, session }) {
          if (token) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.picture
          }
    
          return session
        },
        async jwt({ token, user }) {
          const dbUser = await db.user.findFirst({
            where: {
              email: token.email,
            },
          })
    
          if (!dbUser) {
            if (user) {
              token.id = user?.id
            }
            return token
          }
    
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
          }
        },
        redirect(){
            return '/login'
        }
      },
}

export const getAuthSession = () => getServerSession(authOptions)