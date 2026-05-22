import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f3e7] dark:bg-[#050805] px-6 transition-colors duration-500">
            <div className="w-full max-w-2xl text-center">

                {/* Big 404 */}
                <h1 className="text-[10rem] font-black leading-none text-[#e3e8d8] dark:text-zinc-800 select-none">
                    404
                </h1>

                {/* Content */}
                <div className="-mt-8 relative z-10">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-lime-700 dark:text-lime-400">
                        Page Not Found
                    </span>

                    <h2 className="text-4xl font-black mt-3 text-[#18240a] dark:text-white leading-tight">
                        This idea does not exist yet.
                    </h2>

                    <p className="mt-4 text-[#5b5d57] dark:text-white/60 max-w-md mx-auto leading-relaxed">
                        The page you are looking for may have been moved, deleted,
                        or never existed. Head back and keep exploring.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3 rounded-xl bg-[#18240a] dark:bg-lime-500 text-white dark:text-black font-semibold transition-all hover:scale-[1.02]"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/ideas"
                            className="px-8 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] text-[#18240a] dark:text-white font-semibold transition-all hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            Explore Ideas
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}