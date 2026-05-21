// import React from 'react';

const CommentCard = ({ comment }) => {
    const formattedTime = new Date(comment.time).toLocaleString();

    return (
        <div className="border border-gray-200 rounded-2xl p-4 space-y-1">
            <p className="text-gray-800">{comment.comment}</p>
            <p className="text-xs text-gray-400">{formattedTime}</p>
        </div>
    );
};

export default CommentCard;