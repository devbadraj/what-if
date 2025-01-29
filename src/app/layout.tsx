import { Bungee_Hairline } from "next/font/google"
import "./globals.css"
import { Metadata } from "next"

const bungeeHairline = Bungee_Hairline({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "What if ?",
  description: "What if? is a platform where you can explore the infinite possibilities of the universe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" className={bungeeHairline.className}>
      <head>
        <link rel="icon" href="/favicon.ico"type="image/x-icon" /> 
      </head>
      <body>{children}</body>
    </html>
  )
}

