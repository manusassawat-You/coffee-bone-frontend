import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
