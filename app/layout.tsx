import "@/styles/globals.css"
import { Inter, DM_Serif_Display } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" })

export const metadata = {
  title: "Abrham - Portfolio",
  description: "Personal portfolio website of Abrham - Full Stack Developer",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon.ico.jpg-dyM4COv1QSaKfPKqxLZnDvm6puoEE0.jpeg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${dmSerif.variable} font-sans`}>{children}</body>
    </html>
  )
}
