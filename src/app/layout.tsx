

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
          <meta name="theme-color" content="#021E2B" />
          <meta name="msapplication-navbutton-color" content="#021E2B" />
          <meta name="apple-mobile-web-app-capable" content="#021E2B" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#021E2B" />


          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        </head>
          <body>{children}</body>

  
      </html>
 
  );
}
