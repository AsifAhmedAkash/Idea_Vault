'use client'
import { Button, Card, DateField, Label } from '@heroui/react';
import { useState } from 'react';
import { authClient } from '@/app/lib/auth-client';
import { username } from 'better-auth/plugins';
// import React from 'react';



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

const BookingCard = ({ idea }) => {

    const {
        data: session,
    } = authClient.useSession()

    // console.log(session);
    const user = session?.user

    // console.log(user);

    const [departureDate, setDepertureDate] = useState(null);
    // console.log(new Date(departureDate));

    const {
        _id,
        estimatedBudget,
        imageURL,
        ideaTitle,

    } = idea;

    const handlBooking = async () => {

        if (!user) return;

        const ideaData = {
            userId: user.id,
            userImage: user.image,
            username: user.name,
            destination: _id,
            destinationName: ideaTitle,
            price: estimatedBudget,
            imageUrl: imageURL,
            departureDate: new Date(departureDate)
        }

        console.log("booking data", ideaData);

        const { data: tokenData } = await authClient.token()
        console.log(tokenData)

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(ideaData)
            }
        )

        const data = await res.json();
        console.log("booking after Api response, ", data);
    }



    return (
        <Card className='rounded-none border-2 mt-5'>
            booking card
            <p className='text-sm text-muted'>Starting from</p>
            <h2 className='text-3xl text-bold'>${price}</h2>
            <p className='text-sm text-muted'>Per Person</p>
            <DateField onChange={setDepertureDate} className="w-[256px]" name="date">
                <Label>Deperture Date</Label>
                <DateField.Group>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                </DateField.Group>
            </DateField>

            <Button onClick={handlBooking} className="w-full rounded-2xl">
                Book now
            </Button>


        </Card>
    );
};

export default BookingCard;