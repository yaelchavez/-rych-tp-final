import Layout from "./components/Layout";
import Carousel from "./components/Carousel";
import ProductCard from "./components/ProductCard";
import db from "@/lib/db";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen_frente: string;
  imagen_atras: string;
};

export default function Home() {
  // Traemos 4 carteras (2 de cada colección, gracias al orden de carga) para la vidriera
  const destacados = db
    .prepare("SELECT id, nombre, precio, imagen_frente, imagen_atras FROM productos WHERE tipo = 'cartera' ORDER BY id LIMIT 4")
    .all() as Producto[];

  return (
    <Layout>
      {/* Frase de marca */}
      <div className="px-6 pt-10 text-center md:pt-14">
        <p className="mx-auto max-w-xl text-base text-gray-600 md:text-lg">
          Diseño, comodidad y personalidad para acompañar todos tus días.
        </p>
      </div>

      {/* Carrusel de colecciones */}
      <Carousel />

      {/* Franja de beneficios */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="grid grid-cols-1 gap-4 text-center text-xs uppercase tracking-wide text-gray-500 md:grid-cols-3 md:text-sm">
          <p>Envío gratis en compras +$150.000</p>
          <p>Cambios dentro de los 30 días</p>
          <p>10% off pagando con transferencia</p>
        </div>
      </div>

      {/* Vidriera de productos destacados */}
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-wide text-black md:text-3xl">
          Los más elegidos
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-8 md:gap-y-14">
          {destacados.map((producto) => (
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
