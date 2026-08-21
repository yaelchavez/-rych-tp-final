import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <Header />

      <div style={{ display: "flex", gap: "20px", padding: "40px", flexWrap: "wrap" }}>
        <ProductCard
          nombre="Hobo Bag R"
          precio={45000}
          descripcion="Cartera de hombro con silueta de media luna, look moderno y funcional."
        />
        <ProductCard
          nombre="Cartera Duffel RYCH"
          precio={38000}
          descripcion="Silueta alargada estilo años 90, acabado marrón chocolate."
        />
      </div>
    </main>
  );
}