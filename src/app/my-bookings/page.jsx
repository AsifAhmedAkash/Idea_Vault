
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Image from "next/image";
import { Button } from "@heroui/react";
import { BookingCancelAlart } from "@/app/components/BookingCancelAlart";
import { redirect } from "next/navigation";

const MyBookingsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    const { token } = await auth.api.getToken({
        headers: await headers(),
    })

    // console.log(session)
    const user = session?.user

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user.id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )

    const bookings = await res.json();
    console.log(bookings);
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold">Booking page</h2>

            <div>
                {
                    bookings.map(booking =>
                        <div key={booking._id} className="flex gap-4 border p-4 max-w-3xl">
                            <Image alt={booking.destinationName} src={booking.imageUrl} width={200} height={200}></Image>
                            <div>
                                <h1>{booking.destinationName}</h1>
                                <p>{booking.departureDate}</p>
                                <p>
                                    Booking id: {booking._id}
                                </p>

                                <p className="text-2xl font-bold text-cyan-500">
                                    $ {booking.price}
                                </p>
                                <BookingCancelAlart bookingId={booking._id}></BookingCancelAlart>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyBookingsPage;