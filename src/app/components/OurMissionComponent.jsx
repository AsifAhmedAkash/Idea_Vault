"use client";

import { useEffect, useRef } from "react";
import { Button, Card } from "@heroui/react";

export default function OurMissionComponent() {
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                    }
                });
            },
            { threshold: 0.1 }
        );

        refs.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const setRef = (el, i) => {
        refs.current[i] = el;
    };

    return (
        <main className="min-h-screen flex items-center justify-center py-20 px-5 md:px-16 bg-background text-foreground">
            <section className="max-w-6xl w-full">

                <span className="text-xs tracking-widest uppercase bg-default-100 px-3 py-1 rounded-full">
                    Our Mission
                </span>

                <div className="grid md:grid-cols-12 gap-10 mt-6">

                    {/* LEFT */}
                    <div
                        ref={(el) => setRef(el, 0)}
                        className="md:col-span-7 opacity-0 translate-y-6 transition-all duration-700"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Cultivating{" "}
                            <span className="text-secondary">Grounded Innovation</span> for
                            Sustainable Growth.
                        </h1>

                        <p className="mt-6 text-default-600 max-w-xl">
                            We bridge early-stage innovation with structured global capital,
                            transforming ideas into scalable systems.
                        </p>

                        <div className="flex gap-4 mt-8 flex-wrap">
                            <Button className="bg-lime-600 dark:bg-lime-500 px-8 font-semibold text-white dark:text-black transition-all duration-300 hover:scale-105">
                                Explore the Framework
                            </Button>

                            <Button variant="bordered">
                                Our Philosophy
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="md:col-span-5 flex flex-col gap-6">

                        {/* IMAGE CARD */}
                        <Card
                            ref={(el) => setRef(el, 1)}
                            className="overflow-hidden opacity-0 translate-y-6 transition-all duration-700"
                        >
                            <div className="relative h-[380px]">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGw12haxrn25JuQHPPEaflbc7UjILQmajofLWhBCFeAYhfc8_YLG3qSlD8RQgXhjzI9wBodvq3XMRlVlKg7aNCXfwb3ygqwPXVu73z4mSDshTUFlgPcy8fzOPFykaPUeEbKuDmpUHs26mCAxXViOSymtKCOAtLHv8AFgymhgDrJ-XopKzgVT8Nuqj_QhPCfBng_9SkCndn8nPZFje5OD-JBjBBzKaQhhARuKuU9QGSjinJaQF6qiO0R8_Wuj7tc0APIzqosLBanlg"
                                    alt="mission"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 text-white">
                                    <div>
                                        <p className="text-xs tracking-widest opacity-80">
                                            FOUNDATION
                                        </p>
                                        <h3 className="text-xl font-semibold">
                                            Structured for Resilience
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card
                            ref={(el) => setRef(el, 2)}
                            className="opacity-0 translate-y-6 transition-all duration-700"
                        >
                            <div className="flex items-center gap-4 p-6">
                                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-black text-xl">
                                    🏦
                                </div>

                                <div>
                                    <h4 className="text-2xl font-bold">$4.2B+</h4>
                                    <p className="text-default-600 text-sm">
                                        Structured capital bridged to emerging ventures.
                                    </p>
                                </div>
                            </div>
                        </Card>

                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-default-200 pt-10">
                    {[
                        ["TRUST", "Institutional Rigor"],
                        ["SPEED", "Organic Velocity"],
                        ["SCALE", "Global Reach"],
                        ["VISION", "Future Aligned"],
                    ].map(([k, v], i) => (
                        <div
                            key={k}
                            ref={(el) => setRef(el, i + 3)}
                            className="opacity-0 translate-y-6 transition-all duration-700"
                        >
                            <p className="text-xs tracking-widest text-secondary">{k}</p>
                            <p className="font-semibold mt-1">{v}</p>
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
}