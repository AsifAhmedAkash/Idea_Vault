'use client'
import { Button, Card, DateField, Label } from '@heroui/react';
import { useState } from 'react';
import { authClient } from '@/app/lib/auth-client';
import { username } from 'better-auth/plugins';
// import React from 'react';

const BookingCard = ({ destination }) => {

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
        price,
        imageUrl,
        destinationName,

    } = destination;

    const handlBooking = async () => {

        if (!user) return;

        const bookingData = {
            userId: user.id,
            userImage: user.image,
            username: user.name,
            destination: _id,
            destinationName,
            price: price,
            imageUrl,
            departureDate: new Date(departureDate)
        }

        console.log("booking data", bookingData);

        const { data: tokenData } = await authClient.token()
        console.log(tokenData)

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(bookingData)
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