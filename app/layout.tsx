"use client";

import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <head>
        <title>Note App</title>
        <meta name="robots" content="noindex, nofollow"/>
    </head>
    <body className={`antialiased`}>
    {children}
      </body>
    </html>
  );
}
