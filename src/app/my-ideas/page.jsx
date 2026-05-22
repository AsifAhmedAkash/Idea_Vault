import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Link from "next/link";

const MyIdeasPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const { token } = await auth.api.getToken({ headers: await headers() });
    const user = session?.user;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideasbycreator/${user.id}`,
        { headers: { authorization: `Bearer ${token}` } }  // ← add this
    );
    const ideas = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">My Ideas</h2>

            <div className="flex flex-col gap-4">
                {ideas.map((idea) => (
                    <div
                        key={idea._id}
                        className="border rounded-2xl p-5 max-w-3xl flex gap-4 shadow-sm"
                    >
                        {/* Image */}
                        <img
                            src={idea.imageURL}
                            alt={idea.ideaTitle}
                            className="w-24 h-24 rounded-xl object-cover shrink-0"
                        />

                        {/* Content */}
                        <div className="flex flex-col gap-1 flex-1">
                            <div className="flex items-center justify-between">
                                <Link
                                    href={`/ideas/${idea._id}`}
                                    className="text-cyan-600 font-semibold text-lg hover:underline"
                                >
                                    {idea.ideaTitle}
                                </Link>
                                <span className="text-xs text-white bg-cyan-500 px-2 py-1 rounded-full">
                                    {idea.category}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm">{idea.shortDescription}</p>

                            <div className="flex gap-2 flex-wrap mt-1">
                                {idea.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-500">
                                    💰 Budget: ${idea.estimatedBudget.toLocaleString()}
                                </span>
                                <Link
                                    href={`/ideas/${idea._id}`}
                                    className="text-sm text-cyan-600 hover:underline"
                                >
                                    View →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {ideas.length === 0 && (
                    <p className="text-gray-500">You have not posted any ideas yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyIdeasPage;