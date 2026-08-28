import { NextResponse } from "next/server";
import db from "@/lib/db";

// PUT /api/productos/5 → actualiza el producto con id 5
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const { nombre, descripcion, precio, stock, imagen } = body;

    db.prepare(
        `UPDATE productos
     SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?
     WHERE id = ?`
    ).run(nombre, descripcion, precio, stock, imagen, id);

    return NextResponse.json({ mensaje: "Producto actualizado" });
}

// DELETE /api/productos/5 → borra el producto con id 5
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    db.prepare("DELETE FROM productos WHERE id = ?").run(id);
    return NextResponse.json({ mensaje: "Producto eliminado" });
}