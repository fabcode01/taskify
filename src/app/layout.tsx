

import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Taskify",
  description: "Taskify. Gerenciador de tarefas",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="pt-br" className="bg-white">
        <head>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        </head>
        <body>{children}</body>
      </html>
 
  );
}
