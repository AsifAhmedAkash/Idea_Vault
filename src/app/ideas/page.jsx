import IdeaCard from "@/app/components/IdeaCard";

const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`);
    const ideas = await res.json();

    return (
        <main className="min-h-screen px-6 md:px-16 py-20 max-w-7xl mx-auto">
            {/* HEADER */}
            <header className="text-center md:text-left mb-16">
                <div className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-5 bg-lime-300 dark:bg-lime-900/50 text-lime-900 dark:text-lime-300">
                    THE GALLERY
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                    Explore Innovation
                </h1>
                <p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                    A curated selection of high-potential ventures bridging organic
                    growth and strategic capital investment.
                </p>
            </header>

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.map((idea) => (
                    <IdeaCard key={idea._id} destination={idea} />
                ))}
            </section>
        </main>
    );
};

export default page;