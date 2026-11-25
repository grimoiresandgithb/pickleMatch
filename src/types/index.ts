import type { ObjectId } from "mongodb";

export type UserRole = "player" | "admin";

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}