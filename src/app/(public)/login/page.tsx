"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Interface state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
                redirectTo: "/dashboard",
            });

            if (!result || result.error || !result.ok) {
                setError("Incorrect email or password.");
                return;
            }

            // Redirect after successful login
            router.replace("/dashboard");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="max-w-lg mx-auto px-6 py-12 sm:py-16">
            <div className="pm-card">

                {/* Page introduction */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl">
                        Welcome back.
                    </h1>

                    <p className="text-muted mt-4">
                        Your next game is waiting for you.
                    </p>
                </div>

                {/* Login form */}
                <form 
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>
                        <label 
                            htmlFor="email"
                            className="pm-label"
                        >
                            Email address
                        </label>

                        <input 
                            id="email"
                            type="email"
                            className="pm-input"
                            placeholder="you@exampl.com"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label 
                            htmlFor="password"
                            className="pm-label"
                        >
                            Password 
                        </label>

                        <input 
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="pm-input"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    {/* Password viability */}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                            type="checkbox"
                            checked={showPassword}
                            onChange={(event) => setShowPassword(event.target.checked)}
                            className="w-5 h-5 accent-petrol-blue"
                        />

                        <span className="text-sm">
                            Show password 
                        </span>
                    </label>

                    {/* Error message */}
                    {error && (
                        <div 
                            role="alert"
                            className="rounded-md border border-danger/30 bg-danger/5 p-3 text-danger text-sm"
                        >
                            {error}
                        </div>
                    )}

                    {/* Login button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading 
                            ? "Logging in..."
                            : "Log in"}
                    </button>
                </form>

                {/* Registration link */}
                <div className="border-t border-border mt-6 pt-6 text-center">
                    <p className="text-muted text-sm">
                        New to PickleMatch?{" "}
                        <Link
                            href="/register"
                            className="text-petrol-blue font-semibold hover:underline"
                        >
                            Join the club 
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}