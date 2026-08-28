import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const {
        nombre,
        tipo,
        coleccion,
        categoria,
        precio,
        descripcion,
        detalles,
        imagenFrente,
        imagenAtras,
        codigo,
        productoRelacionado,
    } = body;

    const detallesArray = String(detalles || "")
        .split("\n")
        .map((linea: string) => linea.trim())
        .filter((linea: string) => linea.length > 0);

    db.prepare(
        `UPDATE productos
     SET nombre = ?, tipo = ?, coleccion = ?, categoria = ?, precio = ?, descripcion = ?, detalles = ?, imagen_frente = ?, imagen_atras = ?, codigo = ?, producto_relacionado = ?
     WHERE id = ?`
    ).run(
        nombre,
        tipo,
        coleccion,
        categoria || "",
        precio,
        descripcion || "",
        JSON.stringify(detallesArray),
        imagenFrente,
        imagenAtras,
        codigo || "",
        productoRelacionado || "",
        id
    );

    return NextResponse.json({ mensaje: "Producto actualizado" });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    db.prepare("DELETE FROM productos WHERE id = ?").run(id);
    return NextResponse.json({ mensaje: "Producto eliminado" });
}
