"use client";

import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import ClientLayout from "./ClientLayout";

export default function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quaternary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading THEFT...</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider>
      <ClientLayout>{children}</ClientLayout>
    </ClerkProvider>
  );
}
