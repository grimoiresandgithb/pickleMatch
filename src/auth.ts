import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "./lib/users";
import { use } from "react";

export const { handlers, auth, signIn, signOut } = NextAuth({

    // Use token-based sessions
    session: {
        strategy: "jwt",
    },

    // Use login page
    pages: {
        signIn: "/login",
    },

    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {

                // Validate credentials
                if (
                    typeof credentials?.email !== "string" ||
                    typeof credentials?.password !== "string"
                ) {
                    return null;
                }

                const email = credentials.email
                    .trim()
                    .toLowerCase();

                const password = credentials.password;

                if (
                    !email ||
                    password.length < 8 ||
                    Buffer.byteLength(password, "utf8") > 72
                ) {
                    return null;
                }

                // Find user in MongoDB
                const users = await getUsersCollection();

                const user = await users.findOne({
                    email,
                });

                if (!user) return null;

                // Compare password with stored hash
                const passwordMatches = await bcrypt.compare(
                    password, user.passwordHash 
                );

                if (!passwordMatches) return null;

                // Return authenticated user
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
});