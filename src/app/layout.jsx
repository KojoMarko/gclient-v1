import "./globals.css";

export const metadata = {
  title: "My Next.js App",
  description: "A modern web application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className=" bg-background text-white font-inter">
        <main className=" flex flex-col justify-center ">
          {children}
        </main>
      </body>
    </html>
  );
}
