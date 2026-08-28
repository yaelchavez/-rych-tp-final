import nodemailer from "nodemailer";
import Handlebars from "handlebars";

// Esta es la "plantilla" del mail escrita con Handlebars.
// Las partes entre {{ }} se reemplazan por los datos reales del formulario.
const plantillaHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
    <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">RYCH</h1>
    </div>
    <div style="padding: 20px; border: 1px solid #eee;">
      <h2>Nueva consulta desde el sitio</h2>
      <p><strong>Nombre:</strong> {{nombre}}</p>
      <p><strong>Email:</strong> {{email}}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="background-color: #f5f5f5; padding: 15px; border-radius: 6px;">{{mensaje}}</p>
    </div>
    <div style="background-color: #111; color: white; text-align: center; padding: 10px; font-size: 12px;">
      RYCH © 2026
    </div>
  </div>
`;

// Compilamos la plantilla una sola vez.
const template = Handlebars.compile(plantillaHTML);

// El "transporter" es la configuración de cómo nos conectamos a Gmail para enviar mails.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

type DatosContacto = {
    nombre: string;
    email: string;
    mensaje: string;
};

export async function enviarMailContacto(datos: DatosContacto) {
    // Le pasamos los datos reales a la plantilla, y Handlebars nos devuelve el HTML final.
    const htmlFinal = template(datos);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // se envía a la misma casilla (simula la bandeja de entrada del negocio)
        subject: `Nueva consulta de ${datos.nombre} - RYCH`,
        html: htmlFinal,
    });
}