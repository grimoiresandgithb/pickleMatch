import { requireAdmin } from "@/lib/authorization";

export default async function AdminPage() {
    const user = await requireAdmin();

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <p className="eyebrow mb-3">
                Behind the scenes
            </p>

            <h1 className="text-4xl sm:text-5xl">
                Club management 
            </h1>

            <p className="text-muted mt-4">
                Welcome, {user.name}. Manage your players, matches, and court availability.
            </p>

            <div className="pm-card mt-8">
                <h2 className="pm-card-title">
                    Administrator access 
                </h2>

                <p className="text-success font-semibold">
                    You have successfully accessed the administrator dashboard.
                </p>

                <p className="text-muted mt-2">
                    Player and match arrangements will appear here as they develop.
                </p>
            </div>
        </section>
    );
}