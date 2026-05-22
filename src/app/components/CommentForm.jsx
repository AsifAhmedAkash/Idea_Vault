'use client'
import React, { useState } from 'react';
import { authClient } from '@/app/lib/auth-client'; // adjust path if needed

const CommentForm = ({ ideaId, onCommentPosted }) => {
    const { data: session } = authClient.useSession();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session?.user?.id) {
            alert("You must be logged in to comment.");
            return;
        }

        const commentData = {
            ideaId,
            userId: session.user.id,
            userName: session.user.name,
            comment,
            like: 0,
            time: new Date().toISOString(),
        };

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    // if verifyToken reads from Authorization header:
                    // 'Authorization': `Bearer ${session.token}`
                },
                credentials: 'include', // sends cookies — needed if verifyToken reads cookie
                body: JSON.stringify(commentData),
            });

            const data = await res.json();
            onCommentPosted?.();
            setComment('');
        } catch (err) {
            console.error("Failed to post comment:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold mb-3">Leave a Comment</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-2xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="self-end bg-cyan-500 text-white px-6 py-2 rounded-xl hover:bg-cyan-600 disabled:opacity-50 transition"
                >
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;