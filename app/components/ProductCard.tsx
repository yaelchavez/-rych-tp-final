"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";

type ProductCardProps = {
    id: number;
    nombre: string;
    precio: number;
    imagenFrente: string;
    imagenAtras: string;
};

export default function ProductCard({ id, nombre, precio, imagenFrente, imagenAtras }: ProductCardProps) {
    const { agregarAlCarrito } = useCart();
    const [agregado, setAgregado] = useState(false);

    const handleAgregar = (e: React.MouseEvent) => {
        e.preventDefault(); // evita que el click navegue a la página del producto
        e.stopPropagation();
        agregarAlCarrito({ id, nombre, precio, imagen: imagenFrente });
        setAgregado(true);
        setTimeout(() => setAgregado(false), 1200);
    };

    return (
        <Link href={`/producto/${id}`} className="group block">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-gray-200 bg-gray-50 p-4 transition-colors duration-300 group-hover:border-gray-400 md:p-6">
                <img
                    src={`/${imagenFrente}`}
                    alt={nombre}
                    className="absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-500 group-hover:opacity-0 md:p-6"
                />
                <img
                    src={`/${imagenAtras}`}
                    alt={`${nombre} - dorso`}
                    className="absolute inset-0 h-full w-full object-contain p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-6"
                />

                {/* Botón "+" para agregar al carrito directo desde el catálogo */}
                <button
                    onClick={handleAgregar}
                    aria-label="Agregar al carrito"
                    className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black text-lg text-white shadow-md transition hover:bg-gray-800"
                >
                    {agregado ? "✓" : "+"}
                </button>
            </div>

            <div className="mt-4 text-center">
                <h3 className="text-sm font-medium text-black transition-colors duration-300 group-hover:text-gray-400 md:text-base">
                    {nombre}
                </h3>
                <p className="mt-1 text-sm font-semibold text-black transition-colors duration-300 group-hover:text-gray-400 md:text-base">
                    ${precio.toLocaleString("es-AR")}
                </p>
            </div>
        </Link>
    );
}