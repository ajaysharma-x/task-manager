"use client";

import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Provider store={store}>
          <Navbar />
          <main className="p-6 max-w-5xl mx-auto">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
