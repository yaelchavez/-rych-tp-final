import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "rych.db"));

// Verificamos si la tabla ya existe con el esquema VIEJO (sin la columna "coleccion").
// Si es así, la borramos para reconstruirla con el esquema nuevo.
const columnas = db.prepare("PRAGMA table_info(productos)").all() as { name: string }[];
const tieneEsquemaViejo = columnas.length > 0 && !columnas.some((c) => c.name === "coleccion");

if (tieneEsquemaViejo) {
    db.exec("DROP TABLE productos");
}

db.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL,
    coleccion TEXT NOT NULL,
    categoria TEXT,
    precio INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    detalles TEXT NOT NULL,
    imagen_frente TEXT NOT NULL,
    imagen_atras TEXT NOT NULL,
    codigo TEXT,
    producto_relacionado TEXT
  )
`);

const cantidad = db.prepare("SELECT COUNT(*) as total FROM productos").get() as { total: number };

if (cantidad.total === 0) {
    const insertar = db.prepare(`
    INSERT INTO productos (nombre, tipo, coleccion, categoria, precio, descripcion, detalles, imagen_frente, imagen_atras, codigo, producto_relacionado)
    VALUES (@nombre, @tipo, @coleccion, @categoria, @precio, @descripcion, @detalles, @imagen_frente, @imagen_atras, @codigo, @producto_relacionado)
  `);

    const productos = [
        {
            nombre: "Amour",
            tipo: "cartera",
            coleccion: "valentines-day",
            categoria: "Cartera de mano y hombro",
            precio: 89999,
            descripcion: "La Cartera Amour es la máxima expresión del romanticismo y la sofisticación de nuestra línea. Diseñada con una icónica e impecable silueta en forma de corazón y una textura graneada premium, esta pieza se convierte en el centro de todas las miradas. Un accesorio audaz, estructurado y lleno de personalidad para llevar tus sentimientos con el mejor estilo.",
            detalles: JSON.stringify([
                "Material: Cuero sintético con textura graneada (marroquinera premium)",
                "Color: Borgoña / Bordó profundo",
                "Medidas: 25 × 22 × 7 cm",
                "Diseño: Silueta rígida estructurada en forma de corazón",
                "Cierre: Metálico bidireccional (doble camino) en la parte superior",
                "Interior: Compartimento completamente forrado",
                "Manijas: Doble asa superior fija para llevar cómodamente al hombro o en la mano",
                "Herrajes: Plateados (placa marcaria frontal y deslizadores)",
                "Capacidad: Celular, billetera mediana, llaves, cosméticos y esenciales",
            ]),
            imagen_frente: "amour.jpg",
            imagen_atras: "amour-atras.jpg",
            codigo: "RYCH-004",
            producto_relacionado: "Billetera Amour",
        },
        {
            nombre: "Billetera Amour",
            tipo: "billetera",
            coleccion: "valentines-day",
            categoria: "Billetera / Monedero de colgar",
            precio: 49999,
            descripcion: "El complemento perfecto para tu colección. La Billetera Amour replica la icónica silueta de corazón en un formato mini, ultra práctico y compacto. Diseñada con una cadena y mosquetón de alta calidad, funciona tanto como un monedero independiente como un charm de lujo para colgar en tus carteras favoritas y llevar tus esenciales con total dinamismo.",
            detalles: JSON.stringify([
                "Material: Cuero sintético con textura saffiano / graneada fina",
                "Color: Borgoña / Bordó profundo",
                "Medidas: 11 × 10 × 2 cm",
                "Diseño: Silueta compacta en forma de corazón con logo metálico aplicado",
                "Cierre: Perimetral de metal para mayor seguridad",
                "Sujeción: Cadena corta con mosquetón desmontable de alta resistencia",
                "Herrajes: Plateados",
                "Capacidad: Monedas, billetes doblados, llaves o auriculares",
            ]),
            imagen_frente: "bamour.jpg",
            imagen_atras: "bamour-atras.jpg",
            codigo: "RYCH-005",
            producto_relacionado: "Amour",
        },
        {
            nombre: "Love Noir",
            tipo: "cartera",
            coleccion: "valentines-day",
            categoria: "Cartera de hombro",
            precio: 99999,
            descripcion: "Inspirada en el romance y la sofisticación nocturna, la Cartera Love Noir fusiona una silueta vanguardista con la pasión del día de los enamorados. Su diseño en negro profundo destaca por una composición única de corazones texturizados en rojo intenso y un sutil juego de texturas, convirtiéndola en la declaración de estilo perfecta para enamorar a primera vista.",
            detalles: JSON.stringify([
                "Material: Cuero sintético (acabado mate combinado con aplique sutil de charol)",
                "Color: Negro con detalles en rojo",
                "Medidas: 24.5 × 13 × 6 cm",
                "Diseño: Tres corazones bordados/aplicados en relieve tono rojo escarlata",
                "Cierre: Magnético bajo solapa asimétrica",
                "Interior: Un compartimento principal forrado + bolsillo interno para tarjetas",
                "Correa: Regulable con hebillas laterales para llevar al hombro o de mano",
                "Herrajes: Plateados",
                "Capacidad: Celular de gran tamaño, billetera compacta, llaves y esenciales de noche",
            ]),
            imagen_frente: "lovenoir.jpg",
            imagen_atras: "lovenoir-atras.jpg",
            codigo: "RYCH-003",
            producto_relacionado: "Billetera Love Noir",
        },
        {
            nombre: "Billetera Love Noir",
            tipo: "billetera",
            coleccion: "valentines-day",
            categoria: "Billetera / Tarjetero con cierre",
            precio: 49999,
            descripcion: "El match perfecto para tu Cartera Love Noir. Esta billetera combina la máxima funcionalidad compacta con una estética romántica y rebelde. Diseñada con ranuras frontales de rápido acceso y un bolsillo seguro con cierre, presenta un encantador patrón de corazones rojos bordados sobre un fondo negro absoluto. Incluye una delicada cadena para asegurar a tus bolsos y llevar tu estilo con vos de forma impecable.",
            detalles: JSON.stringify([
                "Material: Cuero sintético liso de alta calidad",
                "Color: Negro con detalles en rojo",
                "Medidas: 12 × 8.5 × 1 cm",
                "Diseño: Frente con múltiples corazones bordados en relieve tono rojo escarlata y logo de placa exclusivo",
                "Compartimentos frontales: Ranuras externas para tarjetas de acceso rápido",
                "Compartimento posterior: Bolsillo integrado con cierre para monedas o billetes doblados",
                "Cierre: Metálico superior con tirador de cuero sintético",
                "Sujeción: Cadena de eslabones plateada para anclaje interno o uso como charm",
                "Herrajes: Plateados",
            ]),
            imagen_frente: "blovenoir.jpg",
            imagen_atras: "blovenoir-atras.jpg",
            codigo: "RYCH-006",
            producto_relacionado: "Love Noir",
        },
        {
            nombre: "Siena",
            tipo: "cartera",
            coleccion: "daily-essential",
            categoria: "Cartera de hombro",
            precio: 99999,
            descripcion: "Con una silueta curva y vanguardista, la Cartera Siena redefine el minimalismo urbano. Su sofisticada solapa asimétrica aporta una dosis extra de actitud, convirtiéndola en la pieza geométrica perfecta para elevar cualquier outfit del día a la noche con un estilo limpio y depurado.",
            detalles: JSON.stringify([
                "Material: Cuero sintético (PU de alta densidad)",
                "Color: Tiza / Marfil",
                "Medidas: 24.5 × 13 × 6 cm",
                "Cierre: Magnético bajo solapa asimétrica",
                "Interior: Un compartimento principal forrado + bolsillo interno para tarjetas",
                "Correa: Regulable con hebillas laterales para llevar al hombro o de mano",
                "Herrajes: Plateados",
                "Capacidad: Celular de gran tamaño, billetera compacta, llaves y labial",
            ]),
            imagen_frente: "siena.jpg",
            imagen_atras: "siena-atras.jpg",
            codigo: "RYCH-002",
            producto_relacionado: "Billetera Siena",
        },
        {
            nombre: "Billetera Siena",
            tipo: "billetera",
            coleccion: "daily-essential",
            categoria: "Billetera mediana trifold",
            precio: 39999,
            descripcion: "La aliada ideal para tu día a día y el match perfecto de tu Cartera Siena. Esta billetera de diseño trifold (tres partes) combina un cuero graneado premium con un orden inteligente impecable. Su frente se destaca por una elegante solapa sobre con la inicial de la marca en herraje metálico, mientras que su interior desplegable y su monedero posterior te garantizan espacio para todo sin perder tu impronta minimalista.",
            detalles: JSON.stringify([
                "Material: Cuero sintético con textura graneada premium",
                "Color: Tiza / Marfil",
                "Medidas: 11.5 × 9.5 × 3 cm",
                'Diseño: Estructura trifold desplegable con solapa frontal estilo sobre y letra "R" metálica aplicada',
                "Interior: 6 ranuras para tarjetas de crédito, 1 ventana de red/transparente para documento o foto, 1 ranura plana superior para billetes abiertos",
                "Exterior posterior: Bolsillo monedero integrado con cierre y tirador de cuero",
                "Cierre: Broche a presión oculto",
                "Herrajes: Plateados",
            ]),
            imagen_frente: "bsiena.jpg",
            imagen_atras: "bsiena-atras.jpg",
            codigo: "RYCH-007",
            producto_relacionado: "Siena",
        },
        {
            nombre: "Hobo",
            tipo: "cartera",
            coleccion: "daily-essential",
            categoria: "Cartera de hombro hobo",
            precio: 89999,
            descripcion: "La silueta icónica del street style que no puede faltar en tu vestidor. La Cartera Hobo destaca por su diseño curvo de media luna y una textura graneada premium que aporta flexibilidad y sofisticación. Su gran personalidad reside en su correa de hombro ancha con hebilla regulable de alta marroquinería y el sutil herraje de la inicial colocado de forma lateral, convirtiéndola en la pieza urbana perfecta para un look impecable.",
            detalles: JSON.stringify([
                "Material: Cuero sintético con textura graneada premium (alta densidad)",
                "Color: Negro absoluto",
                "Medidas: 25 × 16 × 7 cm (silueta curva)",
                "Diseño: Formato hobo / media luna con base semiestructurada",
                "Cierre: Metálico superior empotrado a lo largo de la curva",
                "Interior: Un compartimento principal completamente forrado + bolsillo interno con cierre",
                "Correa: Asa de hombro integrada, ancha y regulable mediante hebilla metálica y pasador",
                'Herrajes: Plateados (hebilla, pasador y letra "R" lateral)',
                "Capacidad: Celular de gran tamaño, billetera Hobo, llaves, maquillajes y esenciales",
            ]),
            imagen_frente: "hobo.jpg",
            imagen_atras: "hobo-atras.jpg",
            codigo: "RYCH-011",
            producto_relacionado: "Billetera Hobo",
        },
        {
            nombre: "Billetera Hobo",
            tipo: "billetera",
            coleccion: "daily-essential",
            categoria: "Billetera bifold con espejo integrado",
            precio: 49999,
            descripcion: "El complemento definitivo para tu Cartera Hobo. La Billetera Hobo redefine el accesorio práctico con un toque de total exclusividad: un práctico espejo integrado en su interior para retocarte en cualquier momento del día. Confeccionada en cuero sintético negro de textura fluida, combina un sistema de apertura bifold con solapa de broche y un bolsillo monedero exterior para mantener tus esenciales organizados con una estética impecable y urbana.",
            detalles: JSON.stringify([
                "Material: Cuero sintético liso y suave de alta densidad",
                "Color: Negro absoluto",
                "Medidas: 11.5 × 9.5 × 2.5 cm",
                'Diseño: Apertura bifold (dos partes) con solapa frontal recta, herraje con la letra "R" y solapa interna con broche a presión',
                "Particularidad: Espejo rectangular de alta claridad integrado en el compartimento central",
                "Interior: 3 ranuras externas para tarjetas de crédito, compartimento oculto tras las ranuras, estampado de marca exclusivo bajo el espejo",
                "Exterior posterior: Bolsillo monedero independiente con cierre y tirador de cuero sintético a tono",
                "Herrajes: Plateados",
            ]),
            imagen_frente: "bhobo.jpg",
            imagen_atras: "bhobo-atras.jpg",
            codigo: "RYCH-008",
            producto_relacionado: "Hobo",
        },
        {
            nombre: "Duffel",
            tipo: "cartera",
            coleccion: "daily-essential",
            categoria: "Cartera de hombro / Baúl cilíndrico",
            precio: 99999,
            descripcion: "Inspirada en el clásico diseño utilitario con un giro de total tendencia urbana. La Cartera Duffel destaca por su silueta cilíndrica estructurada y sus emblemáticos bolsillos laterales con solapa que maximizan su funcionalidad. Confeccionada en un cuero sintético marrón chocolate de acabado satinado premium y un asa superior generosa y cómoda, es la pieza ideal para quienes buscan marcar la diferencia con un estilo retro y sofisticado todos los días.",
            detalles: JSON.stringify([
                "Material: Cuero sintético suave con acabado satinado premium",
                "Color: Marrón Chocolate / Café",
                "Medidas: 28 × 14 × 12 cm",
                "Diseño: Silueta tipo baúl alargado con costuras reforzadas a tono",
                "Bolsillos externos: Dos bolsillos laterales funcionales con solapa y broche a presión",
                "Cierre: Cierre de metal superior de apertura completa para fácil acceso",
                "Interior: Compartimento principal forrado de gran apertura + bolsillo interno para celular",
                "Manijas: Doble asa superior fija, acolchada y alargada, diseñada para llevar cómodamente al hombro",
                "Herrajes: Plateados de alta resistencia",
                "Capacidad: Celular de cualquier tamaño, billetera grande, botellita de agua pequeña, cosméticos y llaves",
            ]),
            imagen_frente: "duffel.jpg",
            imagen_atras: "duffel-atras.jpg",
            codigo: "RYCH-010",
            producto_relacionado: "Billetera Duffel",
        },
        {
            nombre: "Billetera Duffel",
            tipo: "billetera",
            coleccion: "daily-essential",
            categoria: "Billetera / Tarjetero con cierre",
            precio: 39999,
            descripcion: "La sofisticación clásica hecha accesorio. La Billetera Duffel destaca por su cuero sintético texturizado en un cálido tono marrón con acabado vintage y lujosos herrajes dorados. Diseñada como el complemento definitivo para tu Cartera Duffel, ofrece una distribución inteligente de ranuras para tarjetas en ambos lados aseguradas por una presilla frontal con broche, sumando un bolsillo superior con cierre para guardar tus monedas y billetes con total seguridad y elegancia.",
            detalles: JSON.stringify([
                "Material: Cuero sintético texturizado con efecto gastado premium",
                "Color: Marrón / Suela",
                "Medidas: 12 × 9 × 1.5 cm",
                'Diseño: Estructura plana de doble faz con presilla frontal de seguridad y herraje metálico de la letra "R"',
                "Compartimento frontal: 4 ranuras externas para tarjetas de acceso rápido, logotipo de la marca grabado a tono",
                "Compartimento posterior: 2 ranuras externas horizontales para tarjetas adicionales",
                "Compartimento superior: Bolsillo monedero integrado con cierre de metal y tirador combinado",
                "Herrajes: Dorados de alta calidad",
            ]),
            imagen_frente: "bduffel.jpg",
            imagen_atras: "bduffel-atras.jpg",
            codigo: "RYCH-009",
            producto_relacionado: "Duffel",
        },
    ];

    for (const producto of productos) {
        insertar.run(producto);
    }
}

export default db;
