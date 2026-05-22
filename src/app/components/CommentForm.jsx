'use client'
import React, { useState } from 'react';
import { authClient } from '@/app/lib/auth-client';
import { toast } from 'react-toastify';

const CommentForm = ({ ideaId, token, onCommentPosted }) => {
    const { data: session } = authClient.useSession();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session?.user?.id) {
            toast.error("You must be logged in to comment.");
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
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify(commentData),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Failed to post comment');
            }

            onCommentPosted?.();
            setComment('');
            toast.success("Comment posted successfully!");
        } catch (err) {
            console.error("Failed to post comment:", err);
            toast.error(err.message || "Failed to post comment.");
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
                    className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-2xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="self-end bg-lime-600 text-white px-6 py-2 rounded-xl hover:bg-lime-700 disabled:opacity-50 transition"
                >
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;