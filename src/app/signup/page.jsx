"use client";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        setLoading(false);

        if (data) {
            setSuccess("Account created!");
            setTimeout(() => router.push("/"), 1200);
        }

        if (error) {
            setError(error.message || "Signup failed");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({ provider: "google", callbackURL: "/" });
        } catch {
            setError("Google signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f3e7] dark:bg-[#050805] p-6 transition-colors duration-500">
            <div className="w-full max-w-5xl grid md:grid-cols-12 bg-white dark:bg-[#11150f] rounded-2xl shadow-2xl overflow-hidden border border-black/5 dark:border-white/10 transition-colors duration-500">

                {/* LEFT */}
                <div className="hidden md:flex md:col-span-5 bg-[#4c6700] dark:bg-lime-500 text-white dark:text-black p-10 flex-col justify-end transition-colors duration-500">
                    <span className="text-xs uppercase tracking-[0.25em] opacity-80">Join IdeaVault</span>
                    <h2 className="text-4xl font-black mt-4 leading-tight">Build & Share Ideas Globally</h2>
                    <p className="text-sm opacity-80 mt-4 max-w-sm">
                        Connect with innovators, validate ideas, and turn concepts into real-world startups.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="md:col-span-7 p-8 md:p-10">
                    <h2 className="text-3xl font-black text-[#18240a] dark:text-white mb-6 transition-colors duration-500">
                        Create Account
                    </h2>

                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/20 rounded-xl mb-4">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-100 dark:bg-lime-500/10 text-green-700 dark:text-lime-300 border border-green-200 dark:border-lime-500/20 rounded-xl mb-4">
                            {success}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                        <input
                            name="name"
                            required
                            placeholder="Full Name"
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="Email"
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />
                        <input
                            name="image"
                            type="url"
                            placeholder="Photo URL (optional)"
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#18240a] dark:bg-lime-500 py-6 font-semibold text-white dark:text-black transition-all hover:scale-[1.02]"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </Button>

                        <div className="flex items-center gap-3 py-2">
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                            <span className="text-xs text-[#7a7d75] dark:text-white/40 uppercase tracking-wider">OR</span>
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 flex items-center justify-center gap-3 text-[#18240a] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Continue with Google
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-[#5b5d57] dark:text-white/60">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-lime-700 dark:text-lime-400 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;