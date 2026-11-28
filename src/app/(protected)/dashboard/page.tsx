import { requireUser } from "@/lib/authorization";

export default async function DashboardPage() {
    const user = await requireUser();

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <p className="eyebrow mb-3">
                Your neighbourhood court club 
            </p>

            <h1 className="text-4xl sm:text-5xl">
                Welcome, {user.name}!
            </h1>

            <p className="text-muted mt-4">
                Ready to get back on the court?
            </p>

            <div className="pm=card mt-8">

                <h2 className="pm-card-title">
                    Your account 
                </h2>

                <p>
                    <strong>Name:</strong>{" "}
                    {user.name}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {user.email}
                </p>

                <p>
                    <strong>Account type:</strong>{" "}
                    <span className="capitalize">
                        {user.role}
                    </span>
                </p>

                <p className="text-success mt-4 font-semibold">
                    You are successfully logged in.
                </p>
            </div>
        </section>
    )
}