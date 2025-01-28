import "./globals.css";
import SessionWrapper from "./component/SessionWrapper"

export const metadata = {
  title: "ConvoHub",
  description: "Web Chat Application",
  icons: {
    icon: "favicon.png", // Path to favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className="flex flex-col min-h-screen">
          {children}
        </body>
      </SessionWrapper>
    </html>
  )
}