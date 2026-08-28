"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

type Relacionado = {
    id: number;
    nombre: string;
    imagen_frente: string;
};

type ProductoDetalleProps = {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagenFrente: string;
    imagenAtras: string;
    detalles: string[];
    relacionado?: Relacionado;
};

export default function ProductoDetalle({
    id,
    nombre,
    precio,
    descripcion,
    imagenFrente,
    imagenAtras,
    detalles,
    relacionado,
}: ProductoDetalleProps) {
    const imagenes = [imagenFrente, imagenAtras];
    const [indiceActual, setIndiceActual] = useState(0);
    const [detallesAbiertos, setDetallesAbiertos] = useState(false);
    const [agregado, setAgregado] = useState(false);

    const { agregarAlCarrito } = useCart();

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const diferencia = touchStartX.current - touchEndX.current;

        if (diferencia > 50) {
            setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
        }
        if (diferencia < -50) {
            setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
        }
    };

    const handleAgregar = () => {
        agregarAlCarrito({ id, nombre, precio, imagen: imagenFrente });
        setAgregado(true);
        setTimeout(() => setAgregado(false), 1500);
    };

    return (
        <div className="mx-auto max-w-xl px-4 py-8 md:px-8">
            <h1 className="mb-4 text-center text-sm tracking-widest text-gray-500">{nombre}</h1>

            <div
                className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-50"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {imagenes.map((img, i) => (
                    <img
                        key={img}
                        src={`/${img}`}
                        alt={`${nombre} - foto ${i + 1}`}
                        className={`absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-500 ${i === indiceActual ? "z-10 opacity-100" : "z-0 opacity-0"
                            }`}
                    />
                ))}
            </div>

            <div className="mt-4 flex justify-center gap-2">
                {imagenes.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndiceActual(i)}
                        aria-label={`Ver foto ${i + 1}`}
                        className={`h-2 w-2 rounded-full transition ${i === indiceActual ? "bg-black" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>

            <h2 className="mt-6 text-center text-xl font-semibold text-black md:text-2xl">{nombre}</h2>

            <p className="mt-2 text-center text-lg font-semibold text-black">
                ${precio.toLocaleString("es-AR")}
            </p>

            <p className="mt-1 text-center text-sm text-gray-500">
                Con transferencia tenés un 10% de descuento
            </p>

            {/* Descripción larga del producto */}
            <p className="mt-6 text-center text-sm leading-relaxed text-gray-600">{descripcion}</p>

            <button
                onClick={handleAgregar}
                className="mt-6 w-full bg-black py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-gray-800"
            >
                {agregado ? "¡AGREGADO! ✓" : "AÑADIR AL CARRITO"}
            </button>

            <div className="mt-8 border-t border-gray-200">
                <button
                    onClick={() => setDetallesAbiertos(!detallesAbiertos)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold tracking-wide text-black"
                >
                    DETALLES
                    <span className="text-lg">{detallesAbiertos ? "−" : "+"}</span>
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${detallesAbiertos ? "max-h-[600px] pb-6" : "max-h-0"
                        }`}
                >
                    <ul className="space-y-2 text-sm text-gray-600">
                        {detalles.map((detalle, i) => (
                            <li key={i}>• {detalle}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Producto relacionado (hace juego) */}
            {relacionado && (
                <div className="mt-10 border-t border-gray-200 pt-8">
                    <p className="mb-4 text-center text-xs uppercase tracking-widest text-gray-400">
                        Hace juego con
                    </p>
                    <Link
                        href={`/producto/${relacionado.id}`}
                        className="group flex items-center justify-center gap-4"
                    >
                        <img
                            src={`/${relacionado.imagen_frente}`}
                            alt={relacionado.nombre}
                            className="h-20 w-20 rounded-sm border border-gray-200 bg-gray-50 object-contain p-2"
                        />
                        <span className="text-sm font-medium text-black underline-offset-4 group-hover:underline">
                            {relacionado.nombre}
                        </span>
                    </Link>
                </div>
            )}
        </div>
    );
}
