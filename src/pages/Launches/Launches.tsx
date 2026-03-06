import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { getLaunches } from "../../api/launches";
import type { LaunchesResponse } from "../../types/launch";
import style from "./Launches.module.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useSearchParams } from "react-router";

function Launches() {

    const [data, setData] = useState<LaunchesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    
    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                setLoading(true);
                const result = await getLaunches({ page, search });
                setData(result);
                setHasNextPage(result.hasNextPage);
                setHasPrevPage(result.hasPrevPage);
              } catch (error) {
                  console.error("Error fetching launches:", error);
              } finally {
                  setLoading(false);
              }
          };
          
          fetchLaunches();
      }, [page, search]);

      const updateParam = (key: string, value: string) => {
          const params = new URLSearchParams(searchParams);
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
      
          if (key !== "page") {
            params.set("page", "1");
          }
          
          setSearchParams(params);
        };
      
      if (loading && !data)
        return <LoadingSpinner />;
      
      return (
        <>
        <div>
          <NavBar />
          <h1>Launches</h1>
          <input
            type="text"
            placeholder="Search launches..."
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
          />
          <ul style={{listStyle: "none"}}>
            {data?.docs.map((launch) => (
              <li key={launch.id} className={style.launch}>
                <h3>{launch.name}</h3>
                <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.paging}>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={!hasPrevPage}>
                Prev
            </button>

            <button onClick={() => setPage((prev) => prev + 1)} disabled={!hasNextPage}>
                Next
            </button>
            <div>Page {page}</div>
        </div>


        </>
      );
}

export default Launches;