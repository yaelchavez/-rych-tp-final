import Link from "next/link";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import db from "@/lib/db";

type Producto = {
    id: number;
    nombre: string;
    precio: number;
    imagen_frente: string;
    imagen_atras: string;
};

const nombresColeccion: Record<string, string> = {
    "valentines-day": "Valentine's Day",
    "daily-essential": "Daily Essential",
};

const frasesColeccion: Record<string, string> = {
    "valentines-day": "Piezas para enamorar a primera vista.",
    "daily-essential": "Diseños pensados para acompañar tu día a día.",
};

export default async function PaginaColeccion({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const productos = db
        .prepare("SELECT id, nombre, precio, imagen_frente, imagen_atras FROM productos WHERE coleccion = ?")
        .all(slug) as Producto[];

    const titulo = nombresColeccion[slug] ?? slug;
    const frase = frasesColeccion[slug] ?? "";

    return (
        <Layout>
            <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
                <p className="mb-6 text-center text-xs text-gray-400">
                    <Link href="/" className="hover:text-black">
                        Inicio
                    </Link>{" "}
                    / {titulo}
                </p>

                <h1 className="mb-2 text-center text-2xl font-bold tracking-wide text-black md:text-3xl">
                    {titulo}
                </h1>
                {frase && <p className="mb-10 text-center text-gray-500">{frase}</p>}

                <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
                    {productos.map((producto) => (
                        <ProductCard
                            key={producto.id}
                            id={producto.id}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            imagenFrente={producto.imagen_frente}
                            imagenAtras={producto.imagen_atras}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}