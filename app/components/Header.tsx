export default function Header() {
    return (
        <header style={{ backgroundColor: "#1a1a1a", color: "white", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ letterSpacing: "2px" }}>RYCH</h1>
            <nav>
                <ul style={{ listStyle: "none", display: "flex", gap: "25px", margin: 0, padding: 0 }}>
                    <li>Inicio</li>
                    <li>Catálogo</li>
                    <li>Nosotros</li>
                    <li>Contacto</li>
                </ul>
            </nav>
        </header>
    );
}