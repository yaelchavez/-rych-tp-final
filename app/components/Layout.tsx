import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main style={{ minHeight: "60vh" }}>{children}</main>
            <Footer />
        </>
    );
}