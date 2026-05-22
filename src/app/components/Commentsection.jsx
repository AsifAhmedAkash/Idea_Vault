'use client'
import React, { useEffect, useState, useCallback } from 'react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const CommentSection = ({ ideaId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${ideaId}`, {
                credentials: 'include',
            });
            const data = await res.json();
            const sorted = data.sort((a, b) => new Date(b.time) - new Date(a.time));
            setComments(sorted);
        } catch (err) {
            console.error("Failed to fetch comments:", err);
        } finally {
            setLoading(false);
        }
    }, [ideaId]);

    useEffect(() => {
        if (ideaId) fetchComments();
    }, [ideaId, fetchComments]);

    return (
        <div className="space-y-6">
            <CommentForm ideaId={ideaId} onCommentPosted={fetchComments} />

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                    {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                </h3>
                {loading ? (
                    <p className="text-gray-400">Loading comments...</p>
                ) : comments.length === 0 ? (
                    <p className="text-gray-400">No comments yet. Be the first!</p>
                ) : (
                    comments.map(comment => (
                        <CommentCard
                            key={comment._id}
                            comment={comment}
                            onUpdate={(updated) => setComments(prev => prev.map(c => c._id === updated._id ? updated : c))}
                            onDelete={(id) => setComments(prev => prev.filter(c => c._id !== id))}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;