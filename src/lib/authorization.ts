import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getUsersCollection } from "./users";

export async function getCurrentUser() {
    const session = await auth();

    if (
        !session?.user?.id ||
        !ObjectId.isValid(session.user.id)
    ) {
        return null;
    }

    const users = await getUsersCollection();

    const user = await users.findOne(
        {
            _id: new ObjectId(session.user.id),
        },
        {
            projection: {
                passwordHash: 0,
            },
        }
    );

    if (!user) return null;

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

export async function requireUser() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return user;
}

export async function requireAdmin() {
    const user = await requireUser();

    if (user.role !== "admin") {
        redirect("/dashboard");
    }

    return user;
}