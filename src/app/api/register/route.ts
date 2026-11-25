import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoServerError } from "mongodb";
import { getUsersCollection, ensureUserIndexes } from "@/lib/users";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        // Read registration information
        const body = await request.json().catch(() => null);

        if (
            !body ||
            typeof body.name !== "string" ||
            typeof body.email !== "string" ||
            typeof body.password !== "string"
        ) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        const name = body.name.trim();
        const email = body.email.trim().toLowerCase();
        const password = body.password;

        // Validate name
        if (name.length < 2 || name.length > 100) {
            return NextResponse.json(
                {
                    message: "Please enter a name between 2 and 100 characters.",
                },
                { status: 400 }
            );
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(email) ||
            email.length > 254 
        ) {
            return NextResponse.json(
                { message: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        // Validate password
        if (
            password.length < 8 ||
            Buffer.byteLength(password, "utf8") > 72
        ) {
            return NextResponse.json(
                {
                    message: "Your password must be at least 8 characters and no more than 72 bytes.",
                },
                { status: 400 }
            );
        }

        // Connect to a users collection
        await ensureUserIndexes();

        const users = await getUsersCollection();

        // Check for existing account
        const existingUser = await users.findOne({
            email,
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    message: "An account with this email already exists.",
                },
                { status: 409 }
            );
        }

        // Securely hash password
        const passwordHash = await bcrypt.hash(
            password,
            12 
        );

        const now = new Date();

        // Create new user
        const result = await users.insertOne({
            name,
            email,
            passwordHash,
            role: "player",
            createdAt: now,
            updatedAt: now,
        });

        // Return success
        return NextResponse.json(
            {
                success: true,
                message: "Your account has been created!",
                userId: result.insertedId.toString(),
            },
            { status: 201 }
        );
    } catch (error) {
        // Handle duplicate email requests
        if (
            error instanceof MongoServerError &&
            error.code === 11000
        ) {
            return NextResponse.json(
                {
                    message: "An account with this email already exists.",
                },
                { status: 409 }
            );
        }

        console.error("Registration failed: ", error);

        return NextResponse.json(
            {
                message: "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}