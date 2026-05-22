"use client";

import { Button, Chip } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrendingIdeasSection() {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea?limit=6`)
            .then((r) => r.json())
            .then((data) => {
                setIdeas(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section className="bg-[#f8f8f3] dark:bg-[#0b0f08] py-24 transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                {/* Header */}
                <div className="mb-16">
                    <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-400">
                        • Trending Ideas
                    </span>
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl font-black leading-tight text-[#18240a] dark:text-white md:text-5xl lg:text-6xl transition-colors duration-500">
                                Discover the next generation of{" "}
                                <span className="text-lime-700 dark:text-lime-400">
                                    grounded innovation.
                                </span>
                            </h2>
                        </div>
                        <div className="max-w-md">
                            <p className="text-base leading-relaxed text-[#4a4d44] dark:text-white/70 md:text-lg transition-colors duration-500">
                                Every startup idea on IdeaVault is crafted to solve
                                real-world challenges through innovation,
                                scalability, and community-driven collaboration.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {ideas.map((idea) => (
                            <div
                                key={idea._id}
                                className="group overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#11150f] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={idea.imageURL}
                                        alt={idea.ideaTitle}
                                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute left-5 top-5">
                                        <Chip
                                            radius="sm"
                                            className="border border-lime-300/30 bg-lime-300/90 px-3 text-xs font-bold uppercase tracking-wider text-black backdrop-blur-md"
                                        >
                                            {idea.category}
                                        </Chip>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-8">
                                    <h3 className="mb-4 text-2xl font-bold text-[#18240a] dark:text-white transition-colors duration-500">
                                        {idea.ideaTitle}
                                    </h3>
                                    <p className="mb-8 flex-grow leading-relaxed text-[#5b5d57] dark:text-white/65 transition-colors duration-500">
                                        {idea.shortDescription}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-6 transition-colors duration-500">
                                        <div>
                                            <p className="text-sm font-medium text-[#7b7e77] dark:text-white/50">
                                                Estimated Budget
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-lime-700 dark:text-lime-400">
                                                ${idea.estimatedBudget?.toLocaleString()}
                                            </p>
                                        </div>
                                        <Link href={`/ideas/${idea._id}`}>
                                            <Button
                                                radius="sm"
                                                className="bg-[#18240a] dark:bg-lime-500 px-5 text-white dark:text-black transition-all duration-300 group-hover:bg-lime-600 dark:group-hover:bg-lime-400"
                                                endContent={<FaArrowRight />}
                                            >
                                                Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}