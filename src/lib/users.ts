import { getDatabase } from "./mongodb";
import type { User } from "@/types/user";

export async function getUsersCollection() {
    const db = await getDatabase();

    const users = db.collection<User>("users");

    return users;
}

export async function ensureUserIndexes() {
    const users = await getUsersCollection();

    await users.createIndex(
        { email: 1 },
        { unique: true }
    );
}