'use client'
import { authClient } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    FiArrowLeft, FiArrowRight, FiImage, FiLoader, FiCheckCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const AddIdeaPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    // const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        // setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const idea = Object.fromEntries(formData.entries());

        idea.tags = idea.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        idea.estimatedBudget = Number(idea.estimatedBudget);
        idea.creatorId = session?.user?.id;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(idea)
            });
            if (!res.ok) throw new Error("Failed to submit idea.");
            toast.success("Idea submitted successfully!");
            setSuccess(true);
            setTimeout(() => router.push("/my-ideas"), 1200);
        } catch (err) {
            toast.error(err.message || "Failed to submit idea. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-6 md:px-16 py-20 flex justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <div className="w-full max-w-3xl">

                {/* BACK */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 mb-10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer"
                >
                    <FiArrowLeft />
                    <span className="text-xs uppercase tracking-widest font-semibold">Return to Hub</span>
                </button>

                {/* HEADER */}
                <header className="mb-14">
                    <p className="text-xs uppercase tracking-widest mb-3 font-bold text-lime-800 dark:text-lime-400">
                        Innovation Submission
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Seed Your Next Big Idea.
                    </h1>
                    <p className="max-w-xl text-zinc-500 dark:text-zinc-400">
                        Provide the fundamental details of your innovation.
                    </p>
                </header>

                {/* {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-xl text-sm">
                        {error}
                    </div>
                )} */}

                <form onSubmit={onSubmit} className="space-y-14">

                    {/* SECTION 1 — Core Identity */}
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            01 Core Identity
                        </h2>
                        <div className="space-y-6">
                            <input
                                name="ideaTitle"
                                required
                                placeholder="Idea Title"
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                            />
                            <select
                                name="category"
                                required
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                            >
                                <option value="">Select category</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="Technology">Technology</option>
                                <option value="Environment">Environment</option>
                                <option value="Finance">Finance</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Social">Social</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                name="tags"
                                placeholder="Tags (comma separated: drones, logistics, emergency)"
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                            />
                            <textarea
                                name="shortDescription"
                                required
                                rows={2}
                                placeholder="Elevator Pitch (Short Description)"
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none"
                            />
                        </div>
                    </section>

                    {/* SECTION 2 — Narrative & Context */}
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            02 Narrative & Context
                        </h2>
                        <div className="space-y-6">
                            <textarea
                                name="problemStatement"
                                required
                                rows={3}
                                placeholder="Problem Statement"
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none"
                            />
                            <textarea
                                name="proposedSolution"
                                required
                                rows={3}
                                placeholder="Proposed Solution"
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none"
                            />
                            <textarea
                                name="detailedDescription"
                                required
                                rows={6}
                                placeholder="Detailed Description..."
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none"
                            />
                        </div>
                    </section>

                    {/* SECTION 3 — Strategic Logistics */}
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            03 Strategic Logistics
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                name="targetAudience"
                                required
                                placeholder="Target Audience"
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                            />
                            <input
                                name="estimatedBudget"
                                type="number"
                                required
                                placeholder="Estimated Budget (USD)"
                                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                            />
                            <div className="md:col-span-2 flex gap-4 items-center">
                                <input
                                    name="imageURL"
                                    type="url"
                                    required
                                    placeholder="Image URL"
                                    className="flex-1 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                                />
                                <div className="w-14 h-14 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-400">
                                    <FiImage size={20} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SUBMIT */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                        <p className="text-sm max-w-sm text-zinc-500 dark:text-zinc-400">
                            By submitting, you agree to IdeaVault innovation standards.
                        </p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-4 flex items-center gap-2 font-bold rounded-xl text-white bg-lime-700 hover:bg-lime-600 transition cursor-pointer disabled:opacity-60"
                        >
                            {loading ? (
                                <><FiLoader className="animate-spin" /> Processing...</>
                            ) : success ? (
                                <><FiCheckCircle /> Submitted</>
                            ) : (
                                <>Submit Idea <FiArrowRight /></>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddIdeaPage;