import { ToastContainer } from "react-toastify";
import HeaderManager from "./HeaderManager";
// import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer  />
        {children}
        <HeaderManager />
      </body>
    </html>
  );
}
