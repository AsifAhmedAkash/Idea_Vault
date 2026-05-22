// app/components/DeleteCommentButton.jsx
"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const DeleteCommentButton = ({ commentId }) => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleDelete = async () => {
        if (!confirm("Delete this comment?")) return;

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${commentId}`, {
            method: "DELETE",
            credentials: "include",
        });

        router.refresh(); // re-runs the server component to reflect deletion
    };

    return (
        <button
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-700 transition"
        >
            Delete
        </button>
    );
};

export default DeleteCommentButton;