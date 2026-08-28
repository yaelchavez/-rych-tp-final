"use client";

import { useState } from "react";
import Layout from "../components/Layout";

type Bloque = {
    subtitulo?: string;
    parrafos: string[];
};

type Categoria = {
    titulo: string;
    bloques: Bloque[];
};

const categorias: Categoria[] = [
    {
        titulo: "NOSOTROS",
        bloques: [
            {
                subtitulo: "¿De dónde nace RYCH?",
                parrafos: [
                    "RYCH nace de Ruth Chávez Chávez, nombre de su diseñadora y creadora. Cada letra representa una parte de su nombre y, al mismo tiempo, una marca que busca llevar una parte de ella a cada diseño. RYCH nace de las ganas de crear carteras que combinen estilo, comodidad y personalidad, pensadas para acompañar todos los días.",
                ],
            },
            {
                subtitulo: "¿Qué nos diferencia?",
                parrafos: [
                    "En RYCH creemos que una cartera no tiene que ser solamente linda: también tiene que ser cómoda, práctica y versátil. Se crean diseños en cuero sintético, pensados para el día a día y para acompañar diferentes estilos, buscando el equilibrio entre lo clásico y lo actual, con diseños cancheros para cualquier ocasión.",
                ],
            },
            {
                subtitulo: "¿Quién es RYCH?",
                parrafos: [
                    "RYCH es una marca de carteras creada con la intención de combinar diseño, comodidad y estilo en piezas pensadas para todos los días. Diseños versátiles, actuales y con personalidad, creados para acompañar en cada momento.",
                ],
            },
        ],
    },
    {
        titulo: "GARANTÍA",
        bloques: [
            {
                subtitulo: "¿Las carteras cuentan con garantía?",
                parrafos: [
                    "Sí, todos nuestros productos cuentan con una garantía de 6 meses desde la fecha de compra ante fallas de fabricación.",
                ],
            },
            {
                subtitulo: "¿Qué requisito necesito para hacer uso de la garantía?",
                parrafos: [
                    "Es indispensable presentar la factura de compra junto con el producto al momento de realizar el reclamo.",
                ],
            },
            {
                subtitulo: "¿Cómo es el proceso de reclamo de garantía?",
                parrafos: [
                    "1. Presentación: Nos hacés llegar la cartera junto con tu factura de compra.",
                    "2. Evaluación: Nuestro equipo examina el producto para verificar el motivo del reclamo.",
                    "3. Resolución: Una vez aprobada la garantía, te ofrecemos realizar la sustitución por otro producto o la devolución de tu dinero.",
                ],
            },
        ],
    },
    {
        titulo: "ENVÍOS Y CAMBIOS",
        bloques: [
            {
                subtitulo: "Envíos",
                parrafos: [
                    "Envíos a todo el país mediante Correo Argentino. El costo se calcula al momento de la compra; envío gratis en compras superiores a $150.000. Tiempo estimado de entrega: 3 a 7 días hábiles según destino. Una vez despachado el pedido, se envía por mail el código de seguimiento.",
                ],
            },
            {
                subtitulo: "Retiro en persona",
                parrafos: [
                    "Retiro disponible en sede de Vicente López, a partir de los 3 días hábiles de realizada la compra. Se avisa por mail cuando el pedido está listo.",
                ],
            },
            {
                subtitulo: "Cambios",
                parrafos: [
                    "Los cambios pueden realizarse dentro de los 30 días de la compra. La cartera debe conservar etiqueta original, buen estado y sin signos de uso. El envío del cambio se hace por Correo Argentino; una vez recibido y verificado, se contacta al cliente para elegir el nuevo modelo. Los gastos de envío del cambio corren por cuenta del cliente.",
                ],
            },
        ],
    },
    {
        titulo: "MEDIOS DE PAGO",
        bloques: [
            {
                parrafos: [
                    "RYCH ofrece distintas opciones de pago:",
                    "• Tarjetas: crédito y débito bancarias.",
                    "• Billeteras digitales: disponibles como medio de pago.",
                    "• Transferencia bancaria: 10% de descuento sobre el total pagando por esta vía.",
                ],
            },
        ],
    },
];

export default function FAQ() {
    const [abierto, setAbierto] = useState<number | null>(null);

    const toggle = (i: number) => {
        setAbierto(abierto === i ? null : i);
    };

    return (
        <Layout>
            <div className="mx-auto max-w-2xl px-4 py-10 md:px-8">
                <h1 className="mb-8 text-center text-2xl font-bold tracking-wide text-black">
                    Preguntas Frecuentes
                </h1>

                <div className="flex flex-col">
                    {categorias.map((categoria, i) => (
                        <div key={categoria.titulo} className="border-b border-gray-200">
                            <button
                                onClick={() => toggle(i)}
                                className="flex w-full items-center justify-between bg-gray-50 px-5 py-5 text-left text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-gray-100"
                            >
                                {categoria.titulo}
                                <span className="text-lg font-normal">{abierto === i ? "−" : "+"}</span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${abierto === i ? "max-h-[2000px]" : "max-h-0"
                                    }`}
                            >
                                <div className="space-y-6 px-5 py-6">
                                    {categoria.bloques.map((bloque, j) => (
                                        <div key={j}>
                                            {bloque.subtitulo && (
                                                <h3 className="mb-2 font-bold text-black">{bloque.subtitulo}</h3>
                                            )}
                                            {bloque.parrafos.map((parrafo, k) => (
                                                <p key={k} className="mb-2 text-sm leading-relaxed text-gray-600">
                                                    {parrafo}
                                                </p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
