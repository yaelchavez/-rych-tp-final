"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const colecciones = [
    { slug: "valentines-day", imagen: "/valentinesday.jpg", href: "/coleccion/valentines-day" },
    { slug: "daily-essential", imagen: "/dailyessentials.jpg", href: "/coleccion/daily-essential" },
];

export default function Carousel() {
    const [actual, setActual] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const anterior = () => {
        setActual((prev) => (prev === 0 ? colecciones.length - 1 : prev - 1));
    };

    const siguiente = () => {
        setActual((prev) => (prev === colecciones.length - 1 ? 0 : prev + 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const diferencia = touchStartX.current - touchEndX.current;

        if (diferencia > 50) siguiente();
        if (diferencia < -50) anterior();
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
            <div className="relative">
                <div
                    className="relative aspect-video w-full overflow-hidden rounded-sm bg-gray-100"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {colecciones.map((coleccion, i) => (
                        <Link
                            key={coleccion.slug}
                            href={coleccion.href}
                            className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ${i === actual ? "z-10 opacity-100" : "z-0 opacity-0"
                                }`}
                        >
                            <img
                                src={coleccion.imagen}
                                alt={coleccion.slug}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                            />
                        </Link>
                    ))}

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            anterior();
                        }}
                        aria-label="Anterior"
                        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-lg text-black transition hover:bg-white md:left-5 md:p-3"
                    >
                        ‹
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            siguiente();
                        }}
                        aria-label="Siguiente"
                        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-lg text-black transition hover:bg-white md:right-5 md:p-3"
                    >
                        ›
                    </button>
                </div>

                <div className="mt-5 flex justify-center gap-2">
                    {colecciones.map((coleccion, i) => (
                        <button
                            key={coleccion.slug}
                            onClick={() => setActual(i)}
                            aria-label={`Ir a ${coleccion.slug}`}
                            className={`h-2 w-2 rounded-full transition ${i === actual ? "bg-black" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}