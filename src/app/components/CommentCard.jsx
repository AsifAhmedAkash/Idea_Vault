'use client'
import { useState } from 'react';
import { authClient } from '@/app/lib/auth-client';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const CommentCard = ({ comment, onUpdate, onDelete }) => {
    const { data: session } = authClient.useSession();
    const isOwner = session?.user?.id === comment.userId;
    const formattedTime = new Date(comment.time).toLocaleString();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(comment.comment);
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ comment: editText }),
            });
            const data = await res.json();
            onUpdate?.({ ...comment, comment: editText });
            setEditing(false);
            toast.success("Comment updated!");
        } catch (err) {
            console.error("Failed to edit comment:", err);
            toast.error("Failed to edit comment.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            onDelete?.(comment._id);
            toast.success("Comment deleted.");
        } catch (err) {
            toast.error("Failed to delete comment.");
        } finally {
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 space-y-2 bg-white dark:bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-lime-600 text-white text-xs flex items-center justify-center font-bold">
                        {comment.userName?.slice(0, 1).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {comment.userName || "Anonymous"}
                    </span>
                </div>
                <span className="text-xs text-gray-400">{formattedTime}</span>
            </div>

            {/* Comment body */}
            {editing ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 dark:border-zinc-700 rounded-xl p-2 resize-none focus:outline-none text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                    <div className="flex gap-2 self-end">
                        <button
                            onClick={() => setEditing(false)}
                            className="text-xs px-3 py-1 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEdit}
                            disabled={loading}
                            className="text-xs px-3 py-1 rounded-lg bg-lime-700 hover:bg-lime-600 text-white disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-800 dark:text-zinc-300 text-sm">{comment.comment}</p>
            )}

            {/* Footer: likes + owner actions */}
            <div className="flex items-center justify-between pt-1">
                {/* <span className="text-xs text-gray-400">👍 {comment.like}</span> */}
                <span> </span>
                {isOwner && !editing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setEditing(true)}
                            className="text-sm text-zinc-500 hover:text-lime-700 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}  // was onClick={handleDelete}
                            className="text-sm text-red-400 hover:text-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/10 dark:border-white/10 p-7 max-w-sm w-full mx-4 shadow-xl">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 mx-auto mb-4">
                            <FaTrash className="text-red-500 text-lg" />
                        </div>
                        <h3 className="text-center text-lg font-bold text-zinc-800 dark:text-white mb-2">
                            Delete comment?
                        </h3>
                        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                            This action cannot be undone. The comment will be permanently removed.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-2.5 rounded-xl bg-red-100 dark:bg-red-500/10 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentCard;