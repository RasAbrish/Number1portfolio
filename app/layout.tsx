import "@/styles/globals.css"
import CustomCursor from "./components/custom-cursor"
import { Toaster } from "sonner"

export const metadata = {
  title: "Abrham - Portfolio",
  description: "Personal portfolio website of Abrham - Full Stack Developer",
  icons: {
    icon: "/icon.svg",
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
      <body className="font-sans">
        <CustomCursor />
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  )
}
