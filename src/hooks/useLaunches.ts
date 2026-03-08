import { useEffect, useState } from "react";
import { getLaunches, type LaunchFilter } from "../api/launches";
import type { LaunchesResponse } from "../types/launch";

export function useLaunches(page: number, search: string, filter: LaunchFilter) {
  const [data, setData] = useState<LaunchesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getLaunches({ page, search, filter });
        setData(result);
      } catch (error) {
        setError("Failed to fetch launches");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, [page, search, filter]);

  return { data, loading, error };
}