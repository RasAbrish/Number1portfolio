import "@/styles/globals.css"
import localFont from "next/font/local"
import DevCursor from "./components/os/dev-cursor"
import AiChat from "./components/os/ai-chat"
import { Toaster } from "sonner"
import { person, projects } from "@/lib/data"

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

const siteUrl = "https://abrhamababu.pro.et"
const siteTitle = "Abrham Ababu | Senior Full Stack Developer in Ethiopia"
const siteDescription =
  "Official portfolio of Abrham Ababu, a Senior Full Stack Developer in Addis Ababa, Ethiopia, building Next.js, React, TypeScript, NestJS, Laravel, ERPNext, and scalable web applications."

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: person.name,
      givenName: person.firstName,
      familyName: person.lastName,
      url: siteUrl,
      image: `${siteUrl}/Abrish.jpg`,
      jobTitle: "Senior Full Stack Developer",
      email: `mailto:${person.email}`,
      telephone: person.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: "ET",
      },
      sameAs: [person.socials.github, person.socials.linkedin, person.socials.telegram],
      knowsAbout: [
        "Full Stack Development",
        "Next.js",
        "React",
        "TypeScript",
        "NestJS",
        "Laravel",
        "ERPNext",
        "Node.js",
        "Web Applications",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Hope University",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abrham Ababu Portfolio",
      description: siteDescription,
      inLanguage: "en",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
      hasPart: projects
        .filter((project) => project.link && project.link !== "#")
        .slice(0, 8)
        .map((project) => ({
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.link,
          creator: {
            "@id": `${siteUrl}/#person`,
          },
        })),
    },
  ],
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Abrham Ababu",
    "Full Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Abrham Ababu", url: siteUrl }],
  creator: "Abrham Ababu",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Abrham Ababu",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abrham Ababu — Senior Full Stack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "a0C-_AWY6EQ0mu4FvV_QOwuY3Z5mLeyr0S5nZjnVNgk",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <AiChat />
      </body>
    </html>
  )
}
