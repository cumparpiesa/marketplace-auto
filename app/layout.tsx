export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <Navbar />   {/* 🔥 AICI ERA PROBLEMA */}
        {children}
      </body>
    </html>
  )
}