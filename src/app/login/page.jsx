"use client";
import { authClient } from "@/app/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { toast } from 'react-toastify';

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: callbackUrl,
            });
        } catch (err) {
            // setError("Google sign in failed");
            toast.error("Google sign in failed");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // setError("");
        setLoading(true);

        const { data, error } = await authClient.signIn.email({ email, password });

        setLoading(false);

        if (data) {
            toast.success("Logged in successfully!");
            setTimeout(() => router.push(callbackUrl), 1000);
        }

        if (error) {
            toast.error(error.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f3e7] dark:bg-[#050805] p-6 transition-colors duration-500">
            <div className="w-full max-w-5xl grid md:grid-cols-12 bg-white dark:bg-[#11150f] rounded-2xl shadow-2xl overflow-hidden border border-black/5 dark:border-white/10 transition-colors duration-500">

                {/* LEFT */}
                <div className="hidden md:flex md:col-span-6 bg-[#4c6700] dark:bg-lime-500 text-white dark:text-black p-12 flex-col justify-end transition-colors duration-500">
                    <div>
                        <span className="text-xs uppercase tracking-[0.25em] font-semibold opacity-80">
                            Welcome Back
                        </span>
                        <h1 className="text-4xl font-black mt-4 leading-tight">
                            Continue Your Innovation Journey.
                        </h1>
                        <p className="text-sm mt-4 opacity-80 max-w-sm leading-relaxed">
                            Collaborate with founders, validate startup ideas,
                            and shape the future through community-driven innovation.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="md:col-span-6 p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-[#18240a] dark:text-white transition-colors duration-500">
                            Login
                        </h2>
                        <p className="mt-2 text-sm text-[#5b5d57] dark:text-white/60">
                            Access your account and continue building.
                        </p>
                    </div>
                    {/* 
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-100 dark:bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
                            {error}
                        </div>
                    )} */}

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#18240a] dark:text-white/80">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none transition-all duration-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#18240a] dark:text-white/80">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none transition-all duration-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#18240a] dark:bg-lime-500 py-6 text-white dark:text-black font-semibold transition-all duration-300 hover:scale-[1.02]"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <div className="flex items-center gap-3 py-2">
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                            <span className="text-xs font-medium uppercase tracking-wider text-[#7a7d75] dark:text-white/40">OR</span>
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 flex items-center justify-center gap-3 text-[#18240a] dark:text-white transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="h-5 w-5"
                                alt="Google"
                            />
                            Continue with Google
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-[#5b5d57] dark:text-white/60">
                        Dont have an account?{" "}
                        <Link href="/signup" className="font-semibold text-lime-700 dark:text-lime-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;