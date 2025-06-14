"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useState } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
