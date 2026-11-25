import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";

export default async function DashboardPage() {
    const session = await auth();

    // Prevent unauthenticated access
    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen">
            <header className="border-b border-border">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <Logo />

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
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">

                <p className="eyebrow mb-3">
                    Your neighbourhood court club 
                </p>

                <h1 className="text-4xl sm:text-5xl">
                    Welcome, {session?.user?.name}!
                </h1>

                <p className="text-muted mt-4">
                    Ready to get back on the court?
                </p>

                <div className="pm-card mt-8">

                    <h2 className="pm-card-title">
                        Your account 
                    </h2>

                    <p>
                        <strong>Name:</strong>{" "}
                        {session?.user?.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {session?.user?.email}
                    </p>

                    <p className="text-success mt-4 font-semibold">
                        You are successfully logged in.
                    </p>
                </div>
            </main>
        </div>
    );
}