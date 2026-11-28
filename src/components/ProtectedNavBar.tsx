import Link from "next/link";
import Logo from "@/components/Logo";
import { signOut } from "next-auth/react";
import type { UserRole } from "@/types/user";

interface ProtectedNavbarProps {
    role: UserRole;
}

export default function ProtectedNavbar({
    role,
}: ProtectedNavbarProps) {
    return (
        <header className="border-b border-border bg-background">
            <nav 
                aria-label="Main navigation"
                className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4"
            >
                <Logo />

                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <Link
                        href="/dashboard"
                        className="font-semibold hover:text-primary"
                    >
                        Dashboard 
                    </Link>

                    <Link
                        href="/profile"
                        className="font-semibold hover:text-primary"
                    >
                        Profile 
                    </Link>

                    <Link
                        href="/availability"
                        className="font-semibold hover:text-primary"
                    >
                        Availability 
                    </Link>

                    <Link
                        href="/matches"
                        className="font-semibold hover:text-primary"
                    >
                        Matches 
                    </Link>

                    {role === "admin" && (
                        <Link
                            href="/admin"
                            className="font-semibold text-burnt-orange hover:underline"
                        >
                            Admin 
                        </Link>
                    )}

                    <form 
                        action={async () => {
                            "use server";

                            await signOut({
                                redirectTo: "/login",
                            });
                        }}
                    >
                        <button 
                            type="submit"
                            className="btn btn-outline"
                        >
                            Log out 
                        </button>
                    </form>
                </div>
            </nav>
        </header>
    );
}