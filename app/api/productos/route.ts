import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET /api/productos → devuelve todos los productos de la base de datos
export async function GET() {
    const productos = db.prepare("SELECT * FROM productos").all();
    return NextResponse.json(productos);
}

// POST /api/productos → crea un producto nuevo
export async function POST(request: Request) {
    const body = await request.json();
    const { nombre, descripcion, precio, stock, imagen } = body;

    const resultado = db
        .prepare(
            `INSERT INTO productos (nombre, descripcion, precio, stock, imagen)
       VALUES (?, ?, ?, ?, ?)`
        )
        .run(nombre, descripcion, precio, stock, imagen);

    return NextResponse.json({ id: resultado.lastInsertRowid, mensaje: "Producto creado" });
}