import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const productos = db.prepare("SELECT * FROM productos").all();
    return NextResponse.json(productos);
}

export async function POST(request: Request) {
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

    // "detalles" llega como texto con un renglón por cada punto; lo convertimos a JSON
    const detallesArray = String(detalles || "")
        .split("\n")
        .map((linea: string) => linea.trim())
        .filter((linea: string) => linea.length > 0);

    const resultado = db
        .prepare(
            `INSERT INTO productos (nombre, tipo, coleccion, categoria, precio, descripcion, detalles, imagen_frente, imagen_atras, codigo, producto_relacionado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
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
            productoRelacionado || ""
        );

    return NextResponse.json({ id: resultado.lastInsertRowid, mensaje: "Producto creado" });
}
