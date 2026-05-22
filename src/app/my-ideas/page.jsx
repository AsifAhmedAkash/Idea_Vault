import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Link from "next/link";

const MyIdeasPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const { token } = await auth.api.getToken({ headers: await headers() });
    const user = session?.user;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideasbycreator/${user.id}`,
        { headers: { authorization: `Bearer ${token}` } }
    );
    const ideas = await res.json();

    return (
        <main className="max-w-6xl mx-auto px-6 md:px-12 py-20 bg-[#fafaf3] dark:bg-zinc-950 text-[#1a1c18] dark:text-zinc-50">

            {/* HEADER */}
            <header className="mb-16">
                <span className="text-xs tracking-widest uppercase text-[#4c6700] dark:text-lime-400">
                    Innovation Ledger
                </span>
                <h1 className="text-5xl font-bold mt-2">My Ideas</h1>
                <p className="text-lg text-[#45483f] dark:text-zinc-400 mt-4 max-w-2xl">
                    A curated collection of your intellectual ventures.
                </p>
            </header>

            {/* LIST */}
            <div className="flex flex-col gap-10">
                {ideas.map((idea) => (
                    <div
                        key={idea._id}
                        className="group flex flex-col md:flex-row w-full bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all"
                    >
                        {/* IMAGE */}
                        <div className="w-full md:w-72 shrink-0 relative min-h-[240px]">
                            <img
                                src={idea.imageURL}
                                alt={idea.ideaTitle}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-[#c5ee68] text-[#1b1c18] px-3 py-1 text-xs rounded-full font-semibold">
                                    {idea.category}
                                </span>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <Link href={`/ideas/${idea._id}`}>
                                            <h3 className="text-2xl font-semibold text-[#18240a] dark:text-white hover:text-lime-700 dark:hover:text-lime-400 transition">
                                                {idea.ideaTitle}
                                            </h3>
                                        </Link>
                                        <div className="flex gap-2 flex-wrap mt-1">
                                            {idea.tags.map((tag) => (
                                                <span key={tag} className="text-xs text-[#45483f] dark:text-zinc-400">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/ideas/${idea._id}`}
                                        className="p-2 hover:bg-[#eeeee7] dark:hover:bg-zinc-800 rounded"
                                    >
                                        👁️
                                    </Link>
                                </div>

                                <p className="text-[#45483f] dark:text-zinc-400 leading-relaxed">
                                    {idea.shortDescription}
                                </p>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-8 flex justify-between text-xs text-[#4c6700] dark:text-lime-400">
                                <span>💰 Budget: ${idea.estimatedBudget.toLocaleString()}</span>
                                <span>{idea.targetAudience}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {ideas.length === 0 && (
                    <div className="text-center py-20 border border-[#e3e3dc] dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl">
                        <p className="text-[#45483f] dark:text-zinc-400">You have not posted any ideas yet.</p>
                        <Link
                            href="/add-idea"
                            className="mt-4 inline-block px-6 py-2 bg-lime-700 hover:bg-lime-600 text-white rounded-full text-sm font-semibold transition"
                        >
                            Post your first idea
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyIdeasPage;