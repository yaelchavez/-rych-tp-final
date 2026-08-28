"use client";

import { useState, useEffect } from "react";

type Producto = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
};

export default function Admin() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [editando, setEditando] = useState<Producto | null>(null);
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
    });

    const cargarProductos = async () => {
        const res = await fetch("/api/productos");
        const data = await res.json();
        setProductos(data);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datos = {
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio: Number(form.precio),
            stock: Number(form.stock),
            imagen: form.imagen,
        };

        if (editando) {
            await fetch(`/api/productos/${editando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
        } else {
            await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
        }

        setForm({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
        setEditando(null);
        cargarProductos();
    };

    const handleEditar = (producto: Producto) => {
        setEditando(producto);
        setForm({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: String(producto.precio),
            stock: String(producto.stock),
            imagen: producto.imagen,
        });
    };

    const handleBorrar = async (id: number) => {
        if (!confirm("¿Seguro que querés borrar este producto?")) return;
        await fetch(`/api/productos/${id}`, { method: "DELETE" });
        cargarProductos();
    };

    return (
        <div style={{ maxWidth: "700px", margin: "40px auto", padding: "0 20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Panel de administración - RYCH</h1>

            <form onSubmit={handleSubmit} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "30px" }}>
                <h2>{editando ? "Editar producto" : "Nuevo producto"}</h2>

                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />

                <label>Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />

                <label>Precio</label>
                <input name="precio" type="number" value={form.precio} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />

                <label>Stock</label>
                <input name="stock" type="number" value={form.stock} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />

                <label>Nombre del archivo de imagen (ej: negra.jpg)</label>
                <input name="imagen" value={form.imagen} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />

                <button type="submit" style={{ padding: "10px 16px", backgroundColor: "#1a1a1a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    {editando ? "Guardar cambios" : "Agregar producto"}
                </button>

                {editando && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditando(null);
                            setForm({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
                        }}
                        style={{ marginLeft: "10px", padding: "10px 16px", backgroundColor: "#ccc", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h2>Productos actuales</h2>
            {productos.map((producto) => (
                <div
                    key={producto.id}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #eee", borderRadius: "6px", padding: "10px", marginBottom: "10px" }}
                >
                    <div>
                        <strong>{producto.nombre}</strong> - ${producto.precio} - Stock: {producto.stock}
                    </div>
                    <div>
                        <button onClick={() => handleEditar(producto)} style={{ marginRight: "8px", padding: "6px 12px", cursor: "pointer" }}>
                            Editar
                        </button>
                        <button
                            onClick={() => handleBorrar(producto.id)}
                            style={{ padding: "6px 12px", backgroundColor: "#c0392b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                            Borrar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}