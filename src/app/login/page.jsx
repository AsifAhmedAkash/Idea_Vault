import { Suspense } from "react";
import LoginPage from "@/app/login/LoginPage";

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#f0f3e7] dark:bg-[#050805]">
                <div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginPage />
        </Suspense>
    );
}