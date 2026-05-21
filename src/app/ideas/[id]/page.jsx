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

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    console.log("token", token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        const text = await res.text(); // read raw response for debugging
        console.error("Backend error:", res.status, text);
        throw new Error(`Failed to fetch destination: ${res.status}`);
    }
    const destination = await res.json();
    // console.log(destination);
    const {
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description
    } = destination;
    return (
        <div className="max-w-7xl mx-auto">
            {/* destination details {id}
             */}


            <div className="flex text-center gap-3 justify-end">
                <DeleteAlert destination={destination}></DeleteAlert>
                <EditModal destination={destination} />

            </div>


            <Image alt={destination} src={imageUrl} height={500} width={500}></Image>
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <FiMapPin /> <span>{country}</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{destinationName}</h2>
                        <div className="flex gap-2 items-center">
                            <FaRegCalendar />
                            {duration}
                        </div>

                    </div>
                </div>

                <BookingCard destination={destination}></BookingCard>



            </div>
            <h2>{category}</h2>

            <h1 className="font-bold text-xl">OverView</h1>
            <p>{description}</p>
        </div>
    );
};

export default DestinationDetailsPage;