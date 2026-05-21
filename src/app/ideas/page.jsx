// import React from 'react';

import IdeaCard from "@/app/components/IdeaCard";

const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`)

    console.log("status:", res.status)
    console.log("SERVER URL:", process.env.NEXT_PUBLIC_SERVER_URL)

    const ideas = await res.json()
    console.log("total ideas ", ideas);
    return (
        <div className="max-w-7xl mx-auto">
            <h2>All ideas</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    ideas.map(idea => <IdeaCard key={idea._id} destination={idea}></IdeaCard>)
                }
            </div>
        </div>
    );
};

export default page;