import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
