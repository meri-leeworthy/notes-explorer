import Footer from "components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="relative flex flex-col items-center w-screen h-screen max-h-screen gradient-bg">
        <div className="flex flex-col w-screen px-4 pt-32 isolate">
          {children}
        </div>
        <Footer />
        <svg className="w-0 h-0">
          <filter id="white-alpha">
            <feColorMatrix
              type="matrix"
              values="0 1 0 0 0
              0 1 0 0 0
              0 1 0 0 0
              -1 -1 -1 1 0 "
            />
          </filter>
        </svg>
      </body>
    </html>
  );
}
