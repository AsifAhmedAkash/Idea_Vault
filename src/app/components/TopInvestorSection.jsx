"use client";

import { Card, Button } from "@heroui/react";

const investors = [
    {
        type: "lead",
        title: "GreenHorizon Capital",
        subtitle: "Lead Partner",
        description:
            "Specializing in early-stage Sustainable Tech and renewable energy infrastructure. GreenHorizon brings decades of regulatory expertise.",
        tags: ["Sustainable Tech", "Climate Infrastructure"],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDxzaSOfbOzVh7NHhZhOqhi098BhlyilA7KTQj0Vi04PoI7_-j6iPJqEs121IbAVjcq09T05ZefzcqYk9lTAZR_b1hSkkVI94CPlHBPBU76cw_1_Pjtz-JmYlSuxX_5c8JsqPKC2_wCtc2IrHiifMj0Mv2tEu6GSLyW4d5ugJxAacE56jJrq8TJbiCyY7nhIy78Ppc1TOYhoUOHRiFl9tus2RrwuLZe9nojkbjZHBD4g",
    },
    {
        type: "small",
        icon: "🌾",
        title: "Terra Firma Group",
        description:
            "Global leader in AgTech and food security systems, focusing on vertical farming and supply chain resilience.",
        tag: "AgTech",
    },
    {
        type: "small",
        icon: "🔗",
        title: "Nexus Ventures",
        description:
            "Bridges traditional industry and AI integration with advanced automation systems.",
        tag: "AI / Automation",
    },
];

export default function TopInvestorSection() {
    return (
        <main className="max-w-[1280px] mx-auto px-5 md:px-16 py-20 bg-background text-foreground">

            {/* HEADER */}
            <header className="mb-16 text-center md:text-left">
                <span className="text-xs tracking-widest bg-default-100 px-3 py-1 rounded-full">
                    PARTNER NETWORK
                </span>

                <h1 className="text-4xl md:text-6xl font-bold mt-4 text-primary">
                    Institutional Backing for Grounded Innovation
                </h1>

                <p className="mt-4 text-default-600 max-w-2xl text-lg">
                    Altravo collaborates with leading global investors building sustainable innovation ecosystems.
                </p>
            </header>
            {/* main part */}
            <div className="grid grid-cols-12 gap-6">

                {/* LEAD INVESTOR */}
                <Card className="col-span-12 lg:col-span-8 overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* IMAGe */}
                        <div className="md:w-1/2 h-64 md:h-auto">
                            <img
                                src={investors[0].image}
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                                alt="GreenHorizon Capital"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 md:w-1/2 flex flex-col justify-center">
                            <p className="text-xs tracking-widest text-default-500">
                                {investors[0].subtitle}
                            </p>

                            <h2 className="text-2xl font-bold mt-2">
                                {investors[0].title}
                            </h2>

                            <p className="mt-3 text-default-600">
                                {investors[0].description}
                            </p>

                            <div className="flex gap-2 mt-4 flex-wrap">
                                {investors[0].tags.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs border px-3 py-1 rounded-full"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </Card>

                {/* carts */}
                {investors.slice(1).map((inv) => (
                    <Card
                        key={inv.title}
                        className="col-span-12 md:col-span-6 lg:col-span-4 transition hover:-translate-y-1"
                    >
                        <div className="p-6 flex flex-col h-full">

                            <div className="text-3xl mb-4">{inv.icon}</div>

                            <h3 className="text-xl font-semibold">
                                {inv.title}
                            </h3>

                            <p className="text-default-600 mt-2 flex-1">
                                {inv.description}
                            </p>

                            <span className="mt-4 text-xs border px-3 py-1 rounded-full w-fit">
                                {inv.tag}
                            </span>

                            <Button
                                variant="light"
                                className="mt-6 self-start text-primary"
                            >
                                View Portfolio →
                            </Button>
                        </div>
                    </Card>
                ))}

                {/* Call to action */}
                <Card className="col-span-12 lg:col-span-8 bg-primary text-white">
                    <div className="p-10 text-center">

                        <h2 className="text-3xl font-bold">
                            Expand the Frontier Together
                        </h2>

                        <p className="mt-4 text-white/80 max-w-xl mx-auto">
                            We seek long-term partners committed to ethical innovation and global impact.
                        </p>

                        <Button className="mt-6 bg-secondary text-black font-medium">
                            Become a Partner
                        </Button>

                    </div>
                </Card>

                {/* LOGO WALL */}
                <div className="col-span-12 pt-12 border-t border-default-200">
                    <p className="text-xs tracking-widest text-center mb-10 text-default-500">
                        TRUSTED BY THE BEST
                    </p>

                    <div className="flex flex-wrap justify-between gap-6 opacity-60">
                        {["SYNAPSE", "STRATA", "FLORET", "STELLAR", "VELOCITY"].map(
                            (name) => (
                                <div
                                    key={name}
                                    className="flex items-center gap-2 hover:opacity-100 transition"
                                >
                                    <span className="text-lg">⬢</span>
                                    <span className="font-semibold">{name}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}