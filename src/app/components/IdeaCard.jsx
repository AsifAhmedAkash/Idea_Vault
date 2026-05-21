// import React from 'react';
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { Button } from "@heroui/react";
import Link from "next/link";

// //demo data 
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

const IdeaCard = ({ destination }) => {
    const { _id, imageURL, ideaTitle, category, shortDescription, estimatedBudget } = destination;
    return (
        <div>
            <Image alt={ideaTitle} src={imageURL} height={400} width={400}></Image>
            <div className="flex">
                <div>
                    <div className="flex items-center gap-2">
                        <FiMapPin /> <span>{category}</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{ideaTitle}</h2>
                        <div className="flex gap-2 items-center">
                            <FaRegCalendar />
                            {shortDescription}
                        </div>

                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold">$ {estimatedBudget}</h2>
                </div>
            </div>
            <Link href={`/ideas/${_id}`}><Button variant="ghost" className="text-cyan-500">See Details</Button></Link>
        </div>
    );
};

export default IdeaCard;