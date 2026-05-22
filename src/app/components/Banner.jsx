"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
    {
        title: "Grounded Ideas, High Stakes Growth",
        image: "https://i.ibb.co.com/dwGTnnff/slide-1.jpg",
    },
    {
        title: "Build Together. Grow Enduringly.",
        image: "https://i.ibb.co.com/RpFtkcZf/slide-2.jpg",
    },
    {
        title: "Structured Success, Scalable Future",
        image: "https://i.ibb.co.com/xPJ2DHs/slide-3.jpg",
    },
];

export default function Banner() {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    const totalSlides = slides.length;

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % totalSlides);
    };

    const restartAuto = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            nextSlide();
        }, 5000);
    };

    const goToSlide = (index) => {
        setCurrent(index);
        restartAuto();
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <main className="relative h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-500">
            {/* Slides */}
            {slides.map((slide, i) => (
                <section
                    key={i}
                    className={`absolute inset-0 transition-all duration-700 ${current === i
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                        }`}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-white/30 dark:bg-black/50 z-10 transition-colors duration-500" />

                    {/* Background Image */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center px-10 md:px-24">
                        <div className="max-w-2xl text-black dark:text-white transition-colors duration-500">
                            <span className="text-xs uppercase tracking-widest bg-white/60 dark:bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                Growth Ecosystem
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
                                {slide.title}
                            </h1>

                            <p className="mt-6 text-black/70 dark:text-white/80 border-l-2 border-green-500 pl-4">
                                bridges innovation and structured capital
                                for modern founders.
                            </p>

                            <div className="flex gap-4 mt-8">
                                <Link href="/ideas">
                                    <button className="px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-400 transition">
                                        Explore Ideas
                                    </button></Link>

                                <button className="px-6 py-3 border border-black dark:border-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
                                    View Portfolio
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Dots */}
            <div className="absolute bottom-10 right-10 z-30 flex flex-col gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-3 h-3 rounded-full border transition-all ${current === i
                            ? "bg-black dark:bg-white scale-110"
                            : "bg-black/30 dark:bg-white/30"
                            }`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10 dark:bg-white/10 z-30 overflow-hidden">
                <div
                    key={current}
                    className="h-full bg-green-500 animate-progress"
                />
            </div>
        </main>
    );
}