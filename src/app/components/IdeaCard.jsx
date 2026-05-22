// import React from 'react';
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

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
        <Link href={`/ideas/${_id}`}>
            <article
                className="group rounded-lg overflow-hidden flex flex-col cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 h-full"
            >
                {/* IMAGE */}
                <div className="h-64 overflow-hidden relative">
                    <img
                        src={imageURL || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"}
                        alt={ideaTitle}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-black/75 text-white font-bold">
                            {category || "GENERAL"}
                        </span>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-lime-700 dark:group-hover:text-lime-400 transition">
                        {ideaTitle}
                    </h3>

                    <p className="flex-grow mb-6 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                        {shortDescription}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                            Targeting ${Number(estimatedBudget).toLocaleString()}
                        </div>
                        <span className="flex items-center gap-2 text-xs font-bold text-lime-800 dark:text-lime-400 group-hover:translate-x-1 transition duration-300">
                            VIEW DETAILS
                            <FiArrowRight />
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default IdeaCard;