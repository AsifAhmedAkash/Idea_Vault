import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { DeleteAlert } from "@/app/components/DeleteAlert";
import Commentsection from "@/app/components/Commentsection";

const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({ headers: await headers() });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`, {
        headers: { authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("Backend error:", res.status, text);
        throw new Error(`Failed to fetch idea: ${res.status}`);
    }

    const idea = await res.json();
    const {
        _id, ideaTitle, shortDescription, detailedDescription,
        category, tags, imageURL, estimatedBudget,
        targetAudience, problemStatement, proposedSolution
    } = idea;

    return (
        <main className=" w-full px-20 md:px-16 py-20 bg-[#fafaf3] dark:bg-zinc-950 text-[#1a1c18] dark:text-zinc-50">

            {/* HERO IMAGE */}
            <div className="relative w-full h-130 overflow-hidden mb-10">
                <img
                    src={imageURL}
                    alt={ideaTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-5 left-5">
                    <span className="bg-[#c5ee68] text-[#1b1c18] px-3 py-1 text-xs rounded-full font-semibold">
                        {category}
                    </span>
                </div>

                {/* Delete button */}
                {/* <div className="absolute top-5 right-5">
                    <DeleteAlert idea={idea} />
                </div> */}

                {/* Title overlay */}
                <div className="absolute bottom-6 left-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{ideaTitle}</h1>
                    <p className="text-white/80 mt-2 max-w-2xl">{shortDescription}</p>
                </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-10">
                {tags?.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full border border-[#e3e3dc] dark:border-zinc-700 text-[#4c6700] dark:text-lime-400 font-medium"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-[#4c6700] dark:text-lime-400 mb-1">Budget</p>
                    <p className="text-xl font-bold">${estimatedBudget?.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-[#4c6700] dark:text-lime-400 mb-1">Audience</p>
                    <p className="text-xl font-bold">{targetAudience}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-[#4c6700] dark:text-lime-400 mb-1">Category</p>
                    <p className="text-xl font-bold">{category}</p>
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="flex flex-col gap-8 mb-16">

                <div className="bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 rounded-2xl p-8">
                    <h2 className="text-xs uppercase tracking-widest text-[#4c6700] dark:text-lime-400 mb-3">Overview</h2>
                    <p className="text-[#45483f] dark:text-zinc-400 leading-relaxed">{detailedDescription}</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 rounded-2xl p-8">
                    <h2 className="text-xs uppercase tracking-widest text-[#4c6700] dark:text-lime-400 mb-3">Problem Statement</h2>
                    <p className="text-[#45483f] dark:text-zinc-400 leading-relaxed">{problemStatement}</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 rounded-2xl p-8">
                    <h2 className="text-xs uppercase tracking-widest text-[#4c6700] dark:text-lime-400 mb-3">Proposed Solution</h2>
                    <p className="text-[#45483f] dark:text-zinc-400 leading-relaxed">{proposedSolution}</p>
                </div>

            </div>

            {/* COMMENTS */}
            <div className="bg-white dark:bg-zinc-900 border border-[#e3e3dc] dark:border-zinc-800 rounded-2xl p-8">
                <h2 className="text-xs uppercase tracking-widest text-[#4c6700] dark:text-lime-400 mb-6">Comments</h2>
                <Commentsection ideaId={_id.toString()} />
            </div>

        </main>
    );
};

export default IdeaDetailsPage;