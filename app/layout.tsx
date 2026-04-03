import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CumparPiesa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>

        <Navbar />

        <main style={{
          minHeight: "80vh",
          padding: "20px",
          background: "#f4f6f8"
        }}>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}