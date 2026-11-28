import { requireUser } from "@/lib/authorization";
import ProtectedNavbar from "@/components/ProtectedNavBar";
import Footer from "@/components/Footer";
import { use } from "react";

export default async function ProtextedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requireUser();

    return (
        <div className="min-h-screen flex flex-col">
            <ProtectedNavbar role={user.role} />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}