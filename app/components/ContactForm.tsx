"use client";

import { useState } from "react";

export default function ContactForm() {
    const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
    const [enviando, setEnviando] = useState(false);
    const [resultado, setResultado] = useState<"exito" | "error" | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnviando(true);
        setResultado(null);

        try {
            const res = await fetch("/api/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setResultado("exito");
                setForm({ nombre: "", email: "", mensaje: "" });
            } else {
                setResultado("error");
            }
        } catch {
            setResultado("error");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-md text-left">
            <label className="mt-3 block text-sm text-white">Nombre</label>
            <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border-0 bg-white px-3 py-2 text-black outline-none"
            />

            <label className="mt-3 block text-sm text-white">Email</label>
            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border-0 bg-white px-3 py-2 text-black outline-none"
            />

            <label className="mt-3 block text-sm text-white">Mensaje</label>
            <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 w-full rounded-md border-0 bg-white px-3 py-2 text-black outline-none"
            />

            <div className="text-center">
                <button
                    type="submit"
                    disabled={enviando}
                    className="mt-6 rounded-md bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {enviando ? "Enviando..." : "Enviar"}
                </button>
            </div>

            {resultado === "exito" && (
                <p className="mt-4 text-center text-green-400">
                    ¡Mensaje enviado con éxito! Te vamos a contactar pronto.
                </p>
            )}
            {resultado === "error" && (
                <p className="mt-4 text-center text-red-400">
                    Hubo un error al enviar el mensaje. Probá de nuevo.
                </p>
            )}
        </form>
    );
}