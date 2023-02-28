import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="relative flex justify-center w-full h-screen max-h-screen overflow-y-scroll gradient-bg">
          <main className="flex flex-col h-full mx-4 mt-32 isolate sm:mt-48 lg:mt-64 max-width-xl">
            {children}
          </main>
        </div>
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
