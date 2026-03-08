import { useEffect, useState } from "react";
import { getShips } from "../api/ships";
import type { Ship } from "../types/ship";

export function useShips(search: string, page: number) {
    const [ships, setShips] = useState<Ship[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        setShips([]);
        setHasMore(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [search]);
    
    useEffect(() => {
        const fetchShips = async () => {
            try {
                setLoading(true);
                setError("");
                
                const result = await getShips({ search, page });
                
                if (page === 1) {
                    setShips(result.docs);
                } else {
                    setShips((prev) => [...prev, ...result.docs]);
                }
                
                setHasMore(result.hasNextPage);
            } catch (error) {
                setError("Failed to fetch ships");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchShips();
    }, [search, page]);
    
    return { ships, loading, error, hasMore };
}