import "@/styles/globals.css"
import localFont from "next/font/local"
import DevCursor from "./components/os/dev-cursor"
import { Toaster } from "sonner"

// Fonts are self-hosted (woff2 in app/fonts) so the build never depends on
// fetching from Google Fonts — no network flakiness, faster builds.
const serif = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
})

const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [{ path: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
})

const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [{ path: "./fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", style: "normal" }],
})

export const metadata = {
  title: "Abrham - Portfolio",
  description: "Personal portfolio website of Abrham - Full Stack Developer",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "a0C-_AWY6EQ0mu4FvV_QOwuY3Z5mLeyr0S5nZjnVNgk",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth dark ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans">
        <DevCursor />
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  )
}
