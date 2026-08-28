import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";

export default function Contacto() {
    return (
        <Layout>
            <section className="mx-auto max-w-2xl px-4 py-16 md:py-24">
                <div className="rounded-lg bg-black px-6 py-10 md:px-12 md:py-14">
                    <h1 className="mb-2 text-center text-2xl font-bold tracking-wide text-white">
                        Contacto
                    </h1>
                    <p className="mb-8 text-center text-gray-400">¿Tenés una consulta? Escribinos.</p>
                    <ContactForm />
                </div>
            </section>
        </Layout>
    );
}