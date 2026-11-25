import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
    return (
        <header className="border-b border-border bg-background">
            <nav 
                aria-label="Main navigation"
                className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4"
            >
                <Logo />

                <div className="flex items-center gap-4 sm:gap-6">
                    <Link
                        href="/login"
                        className="font-semibold hover:text-primary"
                    >
                        Log in 
                    </Link>

                    <Link
                        href="/register"
                        className="btn btn-primary"
                    >
                        Join the club 
                    </Link>
                </div>
            </nav>
        </header>
    );
}