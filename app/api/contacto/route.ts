import { NextResponse } from "next/server";
import { enviarMailContacto } from "@/lib/mailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre, email, mensaje } = body;

        await enviarMailContacto({ nombre, email, mensaje });

        return NextResponse.json({ mensaje: "Mail enviado correctamente" });
    } catch (error) {
        console.error("Error al enviar el mail:", error);
        return NextResponse.json({ mensaje: "Hubo un error al enviar el mail" }, { status: 500 });
    }
}