import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import DeleteCommentButton from "@/app/components/DeleteCommentButton";

// sample data

// "_id": object id "6a0f769d2831527c23ae9088",
// "ideaId": "6a0f63842831527c23ae9077",
// "userId": "6b1f63842831527c23ae9001",
// "comment": "Love the drone delivery concept!",
// "like": 10,
// "time": "2026-05-22T03:20:00"
const MyInteractionsPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const { token } = await auth.api.getToken({ headers: await headers() });
    const user = session?.user;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/commentbyuser/${user.id}`,
        { headers: { authorization: `Bearer ${token}` } }
    );
    const comments = await res.json();

    // Fetch all idea titles in parallel
    // Pass token when fetching idea titles
    const ideaTitles = await Promise.all(
        comments.map(async (comment) => {
            try {
                const r = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideaname/${comment.ideaId}`
                );
                const data = await r.json();
                return { ideaId: comment.ideaId, title: data.title };
            } catch {
                return { ideaId: comment.ideaId, title: "Unknown Idea" };
            }
        })
    );

    const titleMap = Object.fromEntries(ideaTitles.map((i) => [i.ideaId, i.title]));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">My Interactions</h2>

            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="border rounded-2xl p-5 max-w-3xl flex flex-col gap-2 shadow-sm"
                    >
                        {/* Idea title + link */}
                        <div className="flex items-center justify-between">
                            <Link
                                href={`/ideas/${comment.ideaId}`}
                                className="text-cyan-600 font-semibold hover:underline text-lg"
                            >
                                {titleMap[comment.ideaId]}
                            </Link>
                            <span className="text-sm text-gray-400">
                                {new Date(comment.time).toLocaleString()}
                            </span>
                        </div>

                        {/* Comment text */}
                        <p className="text-gray-700">{comment.comment}</p>

                        {/* Footer: likes + delete */}
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-gray-500">👍 {comment.like}</span>
                            <DeleteCommentButton commentId={comment._id} />
                        </div>
                    </div>
                ))}

                {comments.length === 0 && (
                    <p className="text-gray-500">You have not commented on anything yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyInteractionsPage;