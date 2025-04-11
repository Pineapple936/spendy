import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spendy",
  description: "Control your income and expenses using our service",
  icons: {
    icon: "/logotype.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <head>
            <link rel="preload" href="/navbar/chooseAction.svg" as="image" />
            <link rel="preload" href="/expense.svg" as="image" />
            <link rel="preload" href="/income.svg" as="image" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" />
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        </head>
      <body>
        {children}
      </body>
    </html>
  );
}
