import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "CumparPiesa",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="ro">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}