import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "CumparPiesa",
  description: "Marketplace piese auto România",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}