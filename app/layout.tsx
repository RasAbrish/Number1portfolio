import "@/styles/globals.css"
import { Cormorant_Garamond, Manrope } from "next/font/google"
import CustomCursor from "./components/custom-cursor"
import { Toaster } from "sonner"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Abrham - Portfolio",
  description: "Personal portfolio website of Abrham - Full Stack Developer",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth dark ${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <CustomCursor />
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  )
}
