"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";

export default function NavbarComponent() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const isLoggedIn = Boolean(user);

    return (
        <>
            {/* NAVBAR */}
            <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">

                    {/* BRAND */}
                    <Link href="/homepage">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight cursor-pointer">
                            IdeaVault
                        </h1>
                    </Link>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link href="/homepage" className="text-zinc-900 dark:text-white hover:text-lime-700 dark:hover:text-lime-400">Home</Link>
                        <Link href="/ideas" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Ideas</Link>
                        {isLoggedIn && (
                            <>
                                <Link href="/addidea" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Add Idea</Link>
                                <Link href="/myideas" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">My Ideas</Link>
                                <Link href="/myinteraction" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">My Interactions</Link>
                            </>
                        )}
                    </nav>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">
                        {isPending ? (
                            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        ) : !isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-3 py-2 text-sm font-medium">Login</Link>
                                <Link href="/signup">
                                    <Button size="sm" className="bg-lime-700 hover:bg-lime-600 text-white font-semibold">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen((s) => !s)}
                                    className="w-9 h-9 rounded-full bg-lime-600 text-white flex items-center justify-center font-bold overflow-hidden cursor-pointer border border-zinc-200 dark:border-zinc-700"
                                    aria-expanded={dropdownOpen}
                                >
                                    {user?.image ? (
                                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        user?.name?.slice(0, 2).toUpperCase() || "US"
                                    )}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-1 z-50">
                                        <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{user?.name}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{user?.email}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                        >
                                            Profile Management
                                        </Link>
                                        <button
                                            onClick={async () => {
                                                setDropdownOpen(false);
                                                await authClient.signOut();
                                                window.location.href = "/";
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MOBILE BUTTON */}
                        <Button
                            isIconOnly
                            variant="light"
                            className="md:hidden text-zinc-900 dark:text-white"
                            onClick={() => setMobileOpen(true)}
                        >
                            ☰
                        </Button>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${mobileOpen ? "visible opacity-100" : "invisible opacity-0"}`}
                onClick={() => setMobileOpen(false)}
            >
                <div
                    className={`absolute right-0 top-0 w-72 h-full bg-white dark:bg-zinc-900 p-6 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">IdeaVault</h2>
                        <button onClick={() => setMobileOpen(false)} className="text-zinc-500 text-lg">×</button>
                    </div>

                    <div className="flex flex-col gap-5 text-zinc-800 dark:text-zinc-200">
                        <Link href="/homepage" onClick={() => setMobileOpen(false)} className="hover:text-lime-700 font-medium">Home</Link>
                        <Link href="/ideas" onClick={() => setMobileOpen(false)} className="hover:text-lime-700 font-medium">Ideas</Link>
                        {isLoggedIn && (
                            <>
                                <Link href="/addidea" onClick={() => setMobileOpen(false)} className="hover:text-lime-700 font-medium">Add Idea</Link>
                                <Link href="/myideas" onClick={() => setMobileOpen(false)} className="hover:text-lime-700 font-medium">My Ideas</Link>
                                <Link href="/myinteraction" onClick={() => setMobileOpen(false)} className="hover:text-lime-700 font-medium">My Interactions</Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <button
                                onClick={async () => {
                                    setMobileOpen(false);
                                    await signOut();
                                    window.location.href = "/";
                                }}
                                className="text-left text-red-600 dark:text-red-400 font-medium hover:text-red-700"
                            >
                                Sign out
                            </button>
                        )}
                        {!isLoggedIn && (
                            <div className="flex flex-col gap-3">
                                <Link href="/login" onClick={() => setMobileOpen(false)} className="hover:text-lime-700 font-medium">Login</Link>
                                <Link href="/signup" onClick={() => setMobileOpen(false)} className="hover:text-lime-700 font-medium">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SPACER so content doesn't hide behind fixed navbar */}
            <div className="h-20" />
        </>
    );
}