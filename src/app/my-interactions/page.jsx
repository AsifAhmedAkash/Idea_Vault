
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Image from "next/image";
import { Button } from "@heroui/react";
import { BookingCancelAlart } from "@/app/components/BookingCancelAlart";
import { redirect } from "next/navigation";

// sample data

// "_id": "6a0f769d2831527c23ae9088",
// "ideaId": "6a0f63842831527c23ae9077",
// "userId": "6b1f63842831527c23ae9001",
// "comment": "Love the drone delivery concept!",
// "like": 10,
// "time": "2026-05-22T03:20:00"

const MyInteractionsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    const { token } = await auth.api.getToken({
        headers: await headers(),
    })

    // console.log(session)
    const user = session?.user

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/commentbyuser/${user.id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )

    const comments = await res.json();
    console.log(comments);
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold">My Interactions</h2>

            <div>
                {
                    comments.map(comment =>
                        <div key={comment._id} className="flex gap-4 border p-4 max-w-3xl">

                            <div>
                                <h1>{comment.time}</h1>
                                <p>{comment.comment}</p>
                                <p>
                                    like: {comment.like}
                                </p>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyInteractionsPage;