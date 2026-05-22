'use client'
import React, { useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const CommentSection = ({ ideaId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${ideaId}`, {
                    credentials: 'include',
                });
                const data = await res.json();

                // sort most recent first
                const sorted = data.sort((a, b) => new Date(b.time) - new Date(a.time));
                setComments(sorted);
            } catch (err) {
                console.error("Failed to fetch comments:", err);
            } finally {
                setLoading(false);
            }
        };

        if (ideaId) fetchComments();
    }, [ideaId]);

    return (
        <div className="space-y-6">
            <CommentForm ideaId={ideaId} onCommentPosted={(newComment) => {
                setComments(prev => [newComment, ...prev]);
            }} />

            <div className="space-y-4">
                <p className="text-gray-500 text-sm">Comments for {ideaId}</p>
                <h3 className="text-lg font-semibold">
                    {comments.length} Comment{comments.length !== 1 ? 's' : ''}</h3>
                {loading ? (
                    <p className="text-gray-400">Loading comments...</p>
                ) : comments.length === 0 ? (
                    <p className="text-gray-400">No comments yet. Be the first!</p>
                ) : (
                    comments.map(comment => (
                        <CommentCard key={comment._id} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;