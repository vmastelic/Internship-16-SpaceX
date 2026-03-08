import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useShips } from "../../hooks/useShips";
import style from "./Ships.module.css";

function Ships() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    
    const [page, setPage] = useState(1);
    const { ships, loading, error, hasMore } = useShips(search, page);
    
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        setPage(1);
    }, [search]);
    
    useEffect(() => {
        if (loading) return;
        if (!lastElementRef.current) return;
        
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });
        
        observerRef.current.observe(lastElementRef.current);
        
        return () => observerRef.current?.disconnect();
    }, [loading, hasMore, ships]);

    
    const handleSearchChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        
        setSearchParams(params);
    };
    
    return (
        <div>
      <NavBar />
      <h1>Ships</h1>

      <input
        type="text"
        placeholder="Search ships..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        />

      {error && <p>{error}</p>}

      <div>
        {ships.map((ship) => (
            <Link to={`/ships/${ship.id}`} key={ship.id}>
            <div>
              {ship.image ? (
                  <img src={ship.image} alt={ship.name} width={200} />
                ) : (
                    <div>No image</div>
                )}

              <h3>{ship.name}</h3>
              <p>Type: {ship.type || "Unknown"}</p>
              <p>{ship.active ? "Active" : "Inactive"}</p>
            </div>
          </Link>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <div ref={lastElementRef} style={{ height: "40px" }} />
    </div>
  );
}

export default Ships;