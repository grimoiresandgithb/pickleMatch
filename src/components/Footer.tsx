import Logo from "@/components/Logo";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-6">

                <Logo />

                <div className="text-sm text-muted">
                    <p>
                        © {new Date().getFullYear()} PickleMatch.
                    </p>
                    <p>Good games. Good company.</p>
                </div>
            </div>
        </footer>
    );
}