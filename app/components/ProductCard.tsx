type ProductCardProps = {
    nombre: string;
    precio: number;
    descripcion: string;
};

export default function ProductCard({ nombre, precio, descripcion }: ProductCardProps) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", maxWidth: "300px" }}>
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
            <p style={{ fontWeight: "bold" }}>${precio}</p>
        </div>
    );
}