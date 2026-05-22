import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import DeleteCommentButton from "@/app/components/DeleteCommentButton";

const MyInteractionsPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const { token } = await auth.api.getToken({ headers: await headers() });
    const user = session?.user;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/commentbyuser/${user.id}`,
        { headers: { authorization: `Bearer ${token}` } }
    );
    const comments = await res.json();

    const ideaTitles = await Promise.all(
        comments.map(async (comment) => {
            try {
                const r = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideaname/${comment.ideaId}`);
                const data = await r.json();
                return { ideaId: comment.ideaId, title: data.title };
            } catch {
                return { ideaId: comment.ideaId, title: "Unknown Idea" };
            }
        })
    );

    const titleMap = Object.fromEntries(ideaTitles.map((i) => [i.ideaId, i.title]));

    const stats = {
        comments: comments.length,
        ideasDiscussed: new Set(comments.map((c) => c.ideaId)).size,
    };

    return (
        <main className="max-w-6xl mx-auto px-6 md:px-12 py-20 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 min-h-screen">

            {/* HEADER */}
            <header className="mb-16 flex flex-col md:flex-row justify-between md:items-end gap-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                <div>
                    <span className="text-xs uppercase tracking-widest font-extrabold text-lime-800 dark:text-lime-400">
                        Activity Journal
                    </span>
                    <h1 className="text-5xl font-black mt-2 tracking-tight">My Interactions</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl">
                        A chronological record of your contributions and community engagement.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold uppercase">{user.name}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{user.email}</div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                {/* SIDEBAR */}
                <aside className="md:col-span-3">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-8 shadow-sm">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-4">
                                Engagement Stats
                            </h3>
                            <div className="space-y-5 text-sm">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500 dark:text-zinc-400">Total Comments</span>
                                        <span className="font-extrabold">{stats.comments}</span>
                                    </div>
                                    <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-lime-500 transition-all duration-500"
                                            style={{ width: `${Math.min(stats.comments * 5, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500 dark:text-zinc-400">Ideas Discussed</span>
                                        <span className="font-extrabold">{stats.ideasDiscussed}</span>
                                    </div>
                                    <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-lime-500 transition-all duration-500"
                                            style={{ width: `${Math.min(stats.ideasDiscussed * 10, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN FEED */}
                <section className="md:col-span-9 space-y-6">
                    {comments.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 shadow-sm">
                            <h3 className="text-xl font-bold mb-2">No interactions yet</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                                You have not posted any comments yet. Explore ideas and share your thoughts!
                            </p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-extrabold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-600 dark:text-zinc-300 tracking-wider">
                                                COMMENT
                                            </span>
                                            <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                                {new Date(comment.time).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/ideas/${comment.ideaId}`}
                                            className="text-sm font-semibold text-lime-700 dark:text-lime-400 hover:underline"
                                        >
                                            {titleMap[comment.ideaId]}
                                        </Link>
                                    </div>

                                    {/* Comment text */}
                                    <p className="border-l-2 border-lime-500 pl-4 italic text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                                        {comment.comment}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <span className="text-xs text-zinc-400">👍 {comment.like}</span>
                                        <DeleteCommentButton commentId={comment._id} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </main>
    );
};

export default MyInteractionsPage;