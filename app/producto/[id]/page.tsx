import Layout from "../../components/Layout";
import ProductoDetalle from "../../components/ProductoDetalle";
import db from "@/lib/db";
import { notFound } from "next/navigation";

type ProductoDB = {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen_frente: string;
    imagen_atras: string;
    detalles: string;
    producto_relacionado: string | null;
};

type RelacionadoDB = {
    id: number;
    nombre: string;
    imagen_frente: string;
};

export default async function PaginaProducto({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const producto = db
        .prepare(
            "SELECT id, nombre, precio, descripcion, imagen_frente, imagen_atras, detalles, producto_relacionado FROM productos WHERE id = ?"
        )
        .get(id) as ProductoDB | undefined;

    if (!producto) {
        notFound();
    }

    const detallesArray: string[] = JSON.parse(producto.detalles);

    let relacionado: RelacionadoDB | undefined;
    if (producto.producto_relacionado) {
        relacionado = db
            .prepare("SELECT id, nombre, imagen_frente FROM productos WHERE nombre = ?")
            .get(producto.producto_relacionado) as RelacionadoDB | undefined;
    }

    return (
        <Layout>
            <ProductoDetalle
                id={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                descripcion={producto.descripcion}
                imagenFrente={producto.imagen_frente}
                imagenAtras={producto.imagen_atras}
                detalles={detallesArray}
                relacionado={relacionado}
            />
        </Layout>
    );
}
