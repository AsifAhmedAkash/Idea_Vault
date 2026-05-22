"use client";
import { useEffect, useState } from "react";
import IdeaCard from "@/app/components/IdeaCard";

const CATEGORIES = ["All", "Health", "Education", "Technology", "Environment", "Finance", "Agriculture", "Social", "Other"];

const Page = () => {
    const [ideas, setIdeas] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIdeas = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            if (category !== "All") params.set("category", category);

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea?${params.toString()}`);
            const data = await res.json();
            setIdeas(data);
            setLoading(false);
        };

        // debounce search
        const timeout = setTimeout(fetchIdeas, 300);
        return () => clearTimeout(timeout);
    }, [search, category]);

    return (
        <main className="min-h-screen px-6 md:px-16 py-20 max-w-7xl mx-auto">
            {/* HEADER */}
            <header className="text-center md:text-left mb-10">
                <div className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-5 bg-lime-300 dark:bg-lime-900/50 text-lime-900 dark:text-lime-300">
                    IDEA GALLERY
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                    Explore Innovation
                </h1>
                <p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                    A curated selection of high-potential ventures bridging organic
                    growth and strategic capital investment.
                </p>
            </header>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search by idea title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />

                {/* Category filter */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${category === cat
                                ? "bg-lime-700 text-white border-lime-700"
                                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-lime-500"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* GRID */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : ideas.length === 0 ? (
                <div className="text-center py-20 text-zinc-400">
                    No ideas found. Try a different search or category.
                </div>
            ) : (
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ideas.map((idea) => (
                        <IdeaCard key={idea._id} destination={idea} />
                    ))}
                </section>
            )}
        </main>
    );
};

export default Page;