"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ItemCarrito = {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
};

type CartContextType = {
    items: ItemCarrito[];
    agregarAlCarrito: (producto: Omit<ItemCarrito, "cantidad">) => void;
    quitarDelCarrito: (id: number) => void;
    cambiarCantidad: (id: number, cantidad: number) => void;
    cantidadTotal: number;
    precioTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ItemCarrito[]>([]);

    const agregarAlCarrito = (producto: Omit<ItemCarrito, "cantidad">) => {
        setItems((prev) => {
            const existente = prev.find((item) => item.id === producto.id);
            if (existente) {
                return prev.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const quitarDelCarrito = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const cambiarCantidad = (id: number, cantidad: number) => {
        if (cantidad <= 0) {
            quitarDelCarrito(id);
            return;
        }
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad } : item)));
    };

    const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0);
    const precioTotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{ items, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, cantidadTotal, precioTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart tiene que usarse dentro de un CartProvider");
    }
    return context;
}