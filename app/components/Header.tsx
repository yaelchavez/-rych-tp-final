"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";

export default function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const pathname = usePathname();
    const esPaginaNegra = pathname !== "/";

    const { items, quitarDelCarrito, cambiarCantidad, cantidadTotal, precioTotal } = useCart();

    const opciones = [
        { texto: "Inicio", href: "/" },
        { texto: "Valentine's Day", href: "/coleccion/valentines-day" },
        { texto: "Daily Essential", href: "/coleccion/daily-essential" },
        { texto: "Preguntas Frecuentes", href: "/faq" },
        { texto: "Contacto", href: "/contacto" },
    ];

    return (
        <>
            {/* Header fijo arriba */}
            <header
                className={`sticky top-0 z-40 flex items-center justify-center border-b px-6 py-4 transition-colors ${esPaginaNegra ? "border-gray-800 bg-black" : "border-gray-200 bg-white"
                    }`}
            >
                {/* Botón hamburguesa, izquierda */}
                <button
                    onClick={() => setMenuAbierto(true)}
                    aria-label="Abrir menú"
                    className="absolute left-6 flex flex-col gap-[5px] p-2"
                >
                    <span className={`block h-[2px] w-6 ${esPaginaNegra ? "bg-white" : "bg-black"}`}></span>
                    <span className={`block h-[2px] w-6 ${esPaginaNegra ? "bg-white" : "bg-black"}`}></span>
                    <span className={`block h-[2px] w-6 ${esPaginaNegra ? "bg-white" : "bg-black"}`}></span>
                </button>

                {/* Logo centrado */}
                <Link href="/">
                    <img
                        src={esPaginaNegra ? "/logo-rych-blanco.png" : "/logo-rych-negro.png"}
                        alt="RYCH"
                        className="h-8 md:h-9"
                    />
                </Link>

                {/* Ícono de carrito, derecha */}
                <button
                    onClick={() => setCarritoAbierto(true)}
                    aria-label="Abrir carrito"
                    className="absolute right-6 p-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={esPaginaNegra ? "white" : "black"}
                        strokeWidth="1.6"
                    >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {cantidadTotal > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                            {cantidadTotal}
                        </span>
                    )}
                </button>
            </header>

            {/* Fondo oscuro para el menú lateral */}
            <div
                onClick={() => setMenuAbierto(false)}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${menuAbierto ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            {/* Panel lateral del menú (izquierda) */}
            <aside
                className={`fixed left-0 top-0 z-50 h-full w-72 transform bg-white transition-transform duration-300 ease-in-out ${menuAbierto ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <span className="text-sm tracking-widest text-gray-400">MENÚ</span>
                    <button
                        onClick={() => setMenuAbierto(false)}
                        aria-label="Cerrar menú"
                        className="text-2xl leading-none text-black"
                    >
                        ×
                    </button>
                </div>

                <nav className="flex flex-col px-6 py-6">
                    {opciones.map((opcion) => (
                        <Link
                            key={opcion.href}
                            href={opcion.href}
                            onClick={() => setMenuAbierto(false)}
                            className="border-b border-gray-100 py-4 text-sm tracking-wide text-black transition hover:text-gray-500"
                        >
                            {opcion.texto}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Fondo oscuro para el carrito */}
            <div
                onClick={() => setCarritoAbierto(false)}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${carritoAbierto ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            {/* Panel lateral del carrito (derecha) */}
            <aside
                className={`fixed right-0 top-0 z-50 flex h-full w-80 transform flex-col bg-white transition-transform duration-300 ease-in-out ${carritoAbierto ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <span className="text-sm tracking-widest text-gray-400">TU CARRITO</span>
                    <button
                        onClick={() => setCarritoAbierto(false)}
                        aria-label="Cerrar carrito"
                        className="text-2xl leading-none text-black"
                    >
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <p className="mt-10 text-center text-sm text-gray-400">Tu carrito está vacío</p>
                    ) : (
                        <div className="flex flex-col gap-5">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <img
                                        src={`/${item.imagen}`}
                                        alt={item.nombre}
                                        className="h-20 w-20 flex-shrink-0 rounded-sm bg-gray-50 object-contain p-1"
                                    />
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex items-start justify-between">
                                            <p className="text-sm font-medium text-black">{item.nombre}</p>
                                            <button
                                                onClick={() => quitarDelCarrito(item.id)}
                                                aria-label="Quitar producto"
                                                className="text-xs text-gray-400 hover:text-black"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600">${item.precio.toLocaleString("es-AR")}</p>
                                        <div className="mt-1 flex items-center gap-3">
                                            <button
                                                onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                                                className="h-6 w-6 border border-gray-300 text-sm"
                                            >
                                                −
                                            </button>
                                            <span className="text-sm">{item.cantidad}</span>
                                            <button
                                                onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                                                className="h-6 w-6 border border-gray-300 text-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-200 px-6 py-5">
                        <div className="mb-4 flex justify-between text-sm font-semibold text-black">
                            <span>Total</span>
                            <span>${precioTotal.toLocaleString("es-AR")}</span>
                        </div>
                        <button className="w-full bg-black py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-gray-800">
                            FINALIZAR COMPRA
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
