// import React from 'react';
import { FaRegCalendar } from "react-icons/fa";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { Button } from "@heroui/react";
import { EditModal } from "@/app/components/EditModal";
import { DeleteAlert } from "@/app/components/DeleteAlert";
import BookingCard from "@/app/components/BookingCard";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";


//sample data
// "_id": "6a0f63842831527c23ae9077",
// "ideaTitle": "DroneAid",
// "shortDescription": "Emergency medical supply delivery via drones.",
// "detailedDescription": "DroneAid leverages autonomous drones to deliver critical medical supplies to remote or disaster‑hit areas within minutes.",
// "category": "Health",
// "tags": [
// "drones",
// "logistics",
// "emergency"
// ],
// "imageURL": "https://example.com/images/droneaid.jpg",
// "estimatedBudget": 500000,
// "targetAudience": "Hospitals, NGOs, disaster relief agencies",
// "problemStatement": "Remote areas lack timely access to medical supplies during emergencies.",
// "proposedSolution": "Deploy drones with smart routing to deliver medicines and equipment quickly."

const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    console.log("token", token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        const text = await res.text(); // read raw response for debugging
        console.error("Backend error:", res.status, text);
        throw new Error(`Failed to fetch idea: ${res.status}`);
    }
    const idea = await res.json();
    // console.log(idea);
    const {
        _id,
        ideaTitle,
        shortDescription,
        detailedDescription,
        category,
        tags,
        imageURL,
        estimatedBudget,
        targetAudience,
        problemStatement,
        proposedSolution
    } = idea;
    return (
        <div className="max-w-7xl mx-auto">
            {/* idea details {id}
             */}


            <div className="flex text-center gap-3 justify-end">
                <DeleteAlert idea={idea}></DeleteAlert>
                {/* <EditModal idea={idea} /> */}

            </div>


            <Image alt={ideaTitle} src={imageURL} height={500} width={500}></Image>
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <FiMapPin /> <span>{category}</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{ideaTitle}</h2>
                        <div className="flex gap-2 items-center">

                            {shortDescription}
                        </div>

                    </div>
                </div>

                {/* <BookingCard idea={idea}></BookingCard> */}



            </div>
            <h2>{category}</h2>

            <h1 className="font-bold text-xl">Overview</h1>
            <p>{detailedDescription}</p>
        </div>
    );
};

export default IdeaDetailsPage;