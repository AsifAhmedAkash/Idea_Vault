"use client";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({ name: "", image: "" });

    useEffect(() => {
        const fetchSession = async () => {
            const session = await authClient.getSession();
            const user = session?.data?.user;
            if (user) {
                setForm({ name: user.name ?? "", image: user.image ?? "" });
            }
        };
        fetchSession();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const { error } = await authClient.updateUser({
            name: form.name,
            image: form.image,
        });

        setLoading(false);

        if (error) {
            setError(error.message ?? "Something went wrong.");
        } else {
            setSuccess("Profile updated successfully!");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f3e7] dark:bg-[#050805] p-6 transition-colors duration-500">
            <div className="w-full max-w-4xl grid md:grid-cols-12 bg-white dark:bg-[#11150f] rounded-2xl shadow-2xl overflow-hidden border border-black/5 dark:border-white/10 transition-colors duration-500">

                {/* LEFT */}
                <div className="hidden md:flex md:col-span-5 bg-[#4c6700] dark:bg-lime-500 text-white dark:text-black p-10 flex-col justify-between transition-colors duration-500">
                    <div>
                        <span className="text-xs uppercase tracking-[0.25em] opacity-80">Your Account</span>
                        <h2 className="text-4xl font-black mt-4 leading-tight">Manage Your Profile.</h2>
                        <p className="text-sm opacity-80 mt-4 max-w-sm">
                            Keep your identity up to date. Your name and photo are visible to other innovators on the platform.
                        </p>
                    </div>

                    {/* Avatar preview */}
                    {form.image && (
                        <div className="flex flex-col items-start gap-3 mt-10">
                            <p className="text-xs uppercase tracking-widest opacity-70">Preview</p>
                            <img
                                src={form.image}
                                alt="Profile preview"
                                className="w-20 h-20 rounded-full object-cover border-2 border-white/30"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            <p className="text-sm font-semibold">{form.name}</p>
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <div className="md:col-span-7 p-8 md:p-10">
                    <h2 className="text-3xl font-black text-[#18240a] dark:text-white mb-2 transition-colors duration-500">
                        Edit Profile
                    </h2>
                    <p className="text-sm text-[#5b5d57] dark:text-white/60 mb-8">
                        Update your display name and profile picture.
                    </p>

                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/20 rounded-xl mb-4 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-100 dark:bg-lime-500/10 text-green-700 dark:text-lime-300 border border-green-200 dark:border-lime-500/20 rounded-xl mb-4 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#18240a] dark:text-white/80">
                                Display Name
                            </label>
                            <input
                                required
                                placeholder="Your Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#18240a] dark:text-white/80">
                                Profile Picture URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://yourimg.jpg"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#18240a] dark:bg-lime-500 py-6 font-semibold text-white dark:text-black transition-all hover:scale-[1.02]"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;