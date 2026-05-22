"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import {
    FaArrowRight,
    FaChartLine,
    FaLightbulb,
    FaUsers,
} from "react-icons/fa";

const networkUsers = ["A", "B", "C"];

export default function NewsComponent() {
    return (
        <section className="bg-[#fafaf3] dark:bg-[#0b0f08] transition-colors duration-500">
            {/* Hero Section */}
            <div className="relative overflow-hidden px-6 py-24 lg:min-h-screen lg:px-12">
                <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className="relative z-10">
                        <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.3em] text-lime-700 dark:text-lime-400">
                            Grounded Innovation
                        </span>

                        <h1 className="mb-8 text-5xl font-black leading-tight text-[#18240a] dark:text-white md:text-6xl xl:text-7xl transition-colors duration-500">
                            Where Startup Ideas Meet Community Validation.
                        </h1>

                        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#5a5d56] dark:text-white/70 transition-colors duration-500">
                            IdeaVault empowers innovators to showcase startup
                            concepts, gather meaningful feedback, and transform
                            bold visions into scalable ventures through
                            collaborative innovation.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-5">
                            <Button
                                radius="full"
                                size="lg"
                                className="bg-[#18240a] dark:bg-lime-500 px-8 font-semibold text-white dark:text-black shadow-xl shadow-black/10 transition-all duration-300 hover:scale-105"
                                endContent={<FaArrowRight />}
                            >
                                Explore Ideas
                            </Button>

                            <Button
                                radius="full"
                                size="lg"
                                variant="bordered"
                                className="border-[#18240a]/20 dark:border-white/20 bg-white dark:bg-white/5 px-8 text-[#18240a] dark:text-white transition-all duration-300 hover:bg-[#18240a] hover:text-white dark:hover:bg-white dark:hover:text-black"
                            >
                                Our Vision
                            </Button>
                        </div>

                        {/* Mini Stats */}
                        <div className="mt-14 flex flex-wrap gap-8">
                            <div>
                                <h3 className="text-4xl font-black text-[#18240a] dark:text-white">
                                    12K+
                                </h3>

                                <p className="mt-2 text-sm text-[#6b6e67] dark:text-white/50">
                                    Startup Concepts
                                </p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-lime-700 dark:text-lime-400">
                                    4.8K
                                </h3>

                                <p className="mt-2 text-sm text-[#6b6e67] dark:text-white/50">
                                    Active Collaborators
                                </p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-[#18240a] dark:text-white">
                                    84%
                                </h3>

                                <p className="mt-2 text-sm text-[#6b6e67] dark:text-white/50">
                                    Idea Engagement
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative">
                        <div className="overflow-hidden rounded-[40px] border border-black/5 dark:border-white/10 bg-[#e8e9e2] dark:bg-[#11150f] shadow-2xl transition-colors duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                alt="Innovation Workspace"
                                className="h-[700px] w-full object-cover"
                            />
                        </div>

                        {/* Floating Card */}
                        <div className="absolute bottom-8 left-8 hidden max-w-xs rounded-3xl border border-white/20 bg-white/90 dark:bg-black/60 p-6 backdrop-blur-xl lg:block transition-colors duration-500">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-black">
                                <FaLightbulb className="text-xl" />
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-[#18240a] dark:text-white">
                                Innovation Spotlight
                            </h3>

                            <p className="text-sm leading-relaxed text-[#5a5d56] dark:text-white/70">
                                Discover breakthrough startup ideas powered by
                                community collaboration and market-driven
                                feedback.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="bg-white dark:bg-[#050805] py-24 transition-colors duration-500">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-12 lg:px-10">
                    {/* Card 1 */}
                    <div className="rounded-[32px] border border-black/5 dark:border-white/10 bg-[#fafaf3] dark:bg-[#11150f] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:col-span-8">
                        <span className="mb-5 block text-xs font-bold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-400">
                            Active Network
                        </span>

                        <h3 className="mb-4 text-4xl font-black text-[#18240a] dark:text-white">
                            Build with Visionaries
                        </h3>

                        <p className="mb-10 max-w-xl leading-relaxed text-[#5c5f58] dark:text-white/65">
                            Connect with founders, developers, creators, and
                            investors collaborating to refine scalable startup
                            concepts for the future.
                        </p>

                        {/* Users */}
                        <div className="flex items-center -space-x-4">
                            {networkUsers.map((user, index) => (
                                <div
                                    key={index}
                                    className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white dark:border-[#11150f] bg-lime-300 font-bold text-black"
                                >
                                    {user}
                                </div>
                            ))}

                            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white dark:border-[#11150f] bg-[#18240a] dark:bg-lime-500 text-sm font-bold text-white dark:text-black">
                                +12
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col justify-between rounded-[32px] bg-[#18240a] dark:bg-lime-500 p-10 text-white dark:text-black transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:col-span-4">
                        <div>
                            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.25em] text-lime-300 dark:text-black/70">
                                Metrics
                            </span>

                            <h3 className="text-3xl font-black">
                                Community Growth
                            </h3>
                        </div>

                        <div className="mt-16">
                            <div className="text-6xl font-black text-lime-300 dark:text-black">
                                84%
                            </div>

                            <p className="mt-3 max-w-xs text-sm text-gray-300 dark:text-black/70">
                                Of trending ideas receive valuable collaboration
                                and engagement from the community.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-[32px] border border-black/5 dark:border-white/10 bg-[#fafaf3] dark:bg-[#11150f] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:col-span-4">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-300 text-black">
                            <FaChartLine className="text-2xl" />
                        </div>

                        <h3 className="mb-4 text-3xl font-black text-[#18240a] dark:text-white">
                            Data-Driven Insights
                        </h3>

                        <p className="leading-relaxed text-[#5c5f58] dark:text-white/65">
                            Real-time interaction metrics help founders
                            understand idea traction, audience interest, and
                            market potential.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="overflow-hidden rounded-[32px] border border-black/5 dark:border-white/10 bg-white dark:bg-[#11150f] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:col-span-8">
                        <div className="flex flex-col items-center justify-between gap-10 p-10 md:flex-row">
                            <div className="max-w-xl">
                                <h3 className="mb-4 text-4xl font-black text-[#18240a] dark:text-white">
                                    Share Your Startup Idea
                                </h3>

                                <p className="mb-8 leading-relaxed text-[#5c5f58] dark:text-white/65">
                                    Bring your innovation to life by sharing
                                    your concept, collecting community feedback,
                                    and refining your vision with real-world
                                    insights.
                                </p>

                                <Link href="/add-idea">
                                    <Button
                                        radius="full"
                                        size="lg"
                                        className="bg-lime-600 dark:bg-lime-500 px-8 font-semibold text-white dark:text-black transition-all duration-300 hover:scale-105"
                                    >
                                        Add New Idea
                                    </Button>
                                </Link>
                            </div>

                            {/* Icon Circle */}
                            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-500/10">
                                <FaUsers className="text-7xl text-lime-700 dark:text-lime-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}