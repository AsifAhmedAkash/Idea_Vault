"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("loggedIn") === "true") {
            toast.success("Logged in successfully!");
            // clean up the URL
            router.replace(window.location.pathname);
        }
    }, []);

    return null;
};

export default AuthToast;