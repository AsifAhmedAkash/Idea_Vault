"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { authClient } from '@/app/lib/auth-client';
import { Avatar, Button } from '@heroui/react';

const Navbar = () => {

    const {
        data: session,
    } = authClient.useSession()

    // console.log(session);
    const user = session?.user


    const handleSignOut = async () => {
        await authClient.signOut();
    }


    return (
        <nav className='flex justify-between items-center p-5'>
            <ul className='flex gap-3'>
                <li><Link href={'/'}> Home </Link></li>
                <li><Link href={'/ideas'}> Ideas </Link></li>
                <li><Link href={'/my-interactions'}> My-Interactions </Link></li>
                <li><Link href={'/add-destination'}> Add idea </Link></li>
            </ul>

            <div>
                IdeaVault
            </div>

            <ul className='flex gap-3'>


                {
                    user ?
                        <>
                            <div className='flex items-center gap-2'>
                                <li><Link href={'/profile'}> profile </Link></li>
                                <li>

                                    <Avatar>
                                        <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
                                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                </li>
                                <li>
                                    <Button onClick={handleSignOut}
                                        variant='danger' className="rounded-2xl">Logout</Button>
                                </li>
                            </div>
                        </> : <>
                            <li><Link href={'/login'}> login </Link></li>
                            <li><Link href={'/signup'}> signup </Link></li>
                        </>
                }
            </ul>
        </nav>
    );
};

export default Navbar;