import { useQuery } from "@tanstack/react-query";

async function fetchModels() : Promise<Model[]> {
  const res = await fetch("/api/models");
  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }
  return res.json();
}

/**
 * React Query hook to fetch and cache models for all users.
 * Cached globally by the "models" key, and cached forever.
 */
export function useModelsQuery() {
  return useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

