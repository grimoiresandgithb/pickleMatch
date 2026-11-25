"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Interface state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        // Validate matching passwords
        if (password !== confirmPassword) {
            setError("Your passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Your password must be at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, password 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || "Unable to create your account"
                );
                return;
            }

            // Redirect to login after successful registration
            router.push("/login?registered=true");
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
                    <p className="eyebrow mb-3">
                        Your next game awaits 
                    </p>

                    <h2 className="text-muted mt-4">
                        Join the club.
                    </h2>

                    <p className="text-muted mt-4">
                        Good games and good company start here.
                    </p>
                </div>

                {/* Registration form */}
                <form 
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Full name */}
                    <div>
                        <label 
                            htmlFor="name"
                            className="pm-label"
                        >
                            Full name 
                        </label>

                        <input 
                            id="name"
                            type="text"
                            className="pm-input"
                            placeholder="Your name"
                            autoComplete="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            minLength={2}
                            maxLength={100}
                            required
                        />
                    </div>

                    {/* Email address */}
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
                            placeholder="you@example .com"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            maxLength={254}
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
                            placeholder="Create a password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            aria-describedby="password-hint"
                            minLength={8}
                            required
                        />

                        <p 
                            id="password-hint"
                            className="text-sm text-muted mt-2"
                        >
                            At least 8 characters 
                        </p>
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label 
                            htmlFor="confirmPassword"
                            className="pm-label"
                        >
                            Confirm password 
                        </label>

                        <input 
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            className="pm-input"
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                    </div>

                    {/* Password visibility */}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                            type="checkbox"
                            checked={showPassword}
                            onChange={(event) => setShowPassword(event.target.checked)}
                            className="w-5 h-5 accent-petrol-blue"
                        />

                        <span className="text-sm">
                            Show passwords 
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

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading 
                            ? "Creating your account..."
                            : "Create my account"}
                    </button>
                </form>

                {/* Login link */}
                <div className="border-t border-border mt-6 pt-6 text-center">
                    <p className="text-muted text-sm">
                        Already a member?{" "}
                        <Link
                            href="/login"
                            className="text-petrol-blue font-semibold hover:underline"
                        >
                            Log in 
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}