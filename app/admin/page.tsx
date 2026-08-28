"use client";

import { useState, useEffect } from "react";

type Producto = {
    id: number;
    nombre: string;
    tipo: string;
    coleccion: string;
    categoria: string;
    precio: number;
    descripcion: string;
    detalles: string;
    imagen_frente: string;
    imagen_atras: string;
    codigo: string;
    producto_relacionado: string;
};

const formVacio = {
    nombre: "",
    tipo: "cartera",
    coleccion: "valentines-day",
    categoria: "",
    precio: "",
    descripcion: "",
    detalles: "",
    imagenFrente: "",
    imagenAtras: "",
    codigo: "",
    productoRelacionado: "",
};

export default function Admin() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [editando, setEditando] = useState<Producto | null>(null);
    const [form, setForm] = useState(formVacio);

    const cargarProductos = async () => {
        const res = await fetch("/api/productos");
        const data = await res.json();
        setProductos(data);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datos = {
            nombre: form.nombre,
            tipo: form.tipo,
            coleccion: form.coleccion,
            categoria: form.categoria,
            precio: Number(form.precio),
            descripcion: form.descripcion,
            detalles: form.detalles,
            imagenFrente: form.imagenFrente,
            imagenAtras: form.imagenAtras,
            codigo: form.codigo,
            productoRelacionado: form.productoRelacionado,
        };

        let res;
        if (editando) {
            res = await fetch(`/api/productos/${editando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
        } else {
            res = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
        }

        if (!res.ok) {
            alert("Hubo un error al guardar el producto. Revisá que todos los campos obligatorios estén completos.");
            return;
        }

        setForm(formVacio);
        setEditando(null);
        cargarProductos();
    };

    const handleEditar = (producto: Producto) => {
        setEditando(producto);
        let detallesArray: string[] = [];
        try {
            detallesArray = JSON.parse(producto.detalles);
        } catch {
            detallesArray = [];
        }
        setForm({
            nombre: producto.nombre,
            tipo: producto.tipo,
            coleccion: producto.coleccion,
            categoria: producto.categoria || "",
            precio: String(producto.precio),
            descripcion: producto.descripcion || "",
            detalles: detallesArray.join("\n"),
            imagenFrente: producto.imagen_frente,
            imagenAtras: producto.imagen_atras,
            codigo: producto.codigo || "",
            productoRelacionado: producto.producto_relacionado || "",
        });
    };

    const handleBorrar = async (id: number) => {
        if (!confirm("¿Seguro que querés borrar este producto?")) return;
        await fetch(`/api/productos/${id}`, { method: "DELETE" });
        cargarProductos();
    };

    const inputClass =
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

    return (
        <div style={{ maxWidth: "700px", margin: "40px auto", padding: "0 20px", fontFamily: "Arial, sans-serif" }}>
            <h1 className="mb-6 text-2xl font-bold">Panel de administración - RYCH</h1>

            <form onSubmit={handleSubmit} className="mb-10 rounded-lg border border-gray-200 p-6">
                <h2 className="mb-4 text-lg font-semibold">{editando ? "Editar producto" : "Nuevo producto"}</h2>

                <label className="mt-3 block text-sm font-medium">Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required className={inputClass} />

                <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium">Tipo</label>
                        <select name="tipo" value={form.tipo} onChange={handleChange} className={inputClass}>
                            <option value="cartera">Cartera</option>
                            <option value="billetera">Billetera</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Colección</label>
                        <select name="coleccion" value={form.coleccion} onChange={handleChange} className={inputClass}>
                            <option value="valentines-day">Valentine's Day</option>
                            <option value="daily-essential">Daily Essential</option>
                        </select>
                    </div>
                </div>

                <label className="mt-3 block text-sm font-medium">Categoría (ej: Cartera de hombro)</label>
                <input name="categoria" value={form.categoria} onChange={handleChange} className={inputClass} />

                <label className="mt-3 block text-sm font-medium">Precio</label>
                <input name="precio" type="number" value={form.precio} onChange={handleChange} required className={inputClass} />

                <label className="mt-3 block text-sm font-medium">Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} className={inputClass} />

                <label className="mt-3 block text-sm font-medium">Detalles (uno por renglón)</label>
                <textarea
                    name="detalles"
                    value={form.detalles}
                    onChange={handleChange}
                    rows={4}
                    placeholder={"Material: Cuero sintético\nColor: Negro\nMedidas: 20x15x8 cm"}
                    className={inputClass}
                />

                <label className="mt-3 block text-sm font-medium">Nombre del archivo - foto de frente (ej: gamuza.jpg)</label>
                <input name="imagenFrente" value={form.imagenFrente} onChange={handleChange} required className={inputClass} />

                <label className="mt-3 block text-sm font-medium">Nombre del archivo - foto de dorso</label>
                <input name="imagenAtras" value={form.imagenAtras} onChange={handleChange} required className={inputClass} />

                <label className="mt-3 block text-sm font-medium">Código (opcional)</label>
                <input name="codigo" value={form.codigo} onChange={handleChange} className={inputClass} />

                <label className="mt-3 block text-sm font-medium">Producto relacionado (opcional, nombre exacto)</label>
                <input name="productoRelacionado" value={form.productoRelacionado} onChange={handleChange} className={inputClass} />

                <div className="mt-5">
                    <button type="submit" className="rounded-md bg-black px-5 py-2 text-sm font-semibold text-white">
                        {editando ? "Guardar cambios" : "Agregar producto"}
                    </button>
                    {editando && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditando(null);
                                setForm(formVacio);
                            }}
                            className="ml-3 rounded-md bg-gray-200 px-5 py-2 text-sm"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h2 className="mb-4 text-lg font-semibold">Productos actuales</h2>
            {productos.map((producto) => (
                <div
                    key={producto.id}
                    className="mb-3 flex items-center justify-between rounded-md border border-gray-200 p-3"
                >
                    <div className="text-sm">
                        <strong>{producto.nombre}</strong> ({producto.tipo}) - {producto.coleccion} - $
                        {producto.precio}
                    </div>
                    <div>
                        <button onClick={() => handleEditar(producto)} className="mr-2 rounded border px-3 py-1 text-sm">
                            Editar
                        </button>
                        <button
                            onClick={() => handleBorrar(producto.id)}
                            className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                        >
                            Borrar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
