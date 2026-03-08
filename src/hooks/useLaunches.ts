import { useEffect, useState } from "react";
import { getLaunches } from "../api/launches";
import type { LaunchesResponse } from "../types/launch";

export function useLaunches(page: number, search: string) {
  const [data, setData] = useState<LaunchesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getLaunches({ page, search });
        setData(result);
      } catch (error) {
        setError("Failed to fetch launches");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, [page, search]);

  return { data, loading, error };
}