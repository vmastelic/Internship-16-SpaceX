import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { getLaunches } from "../../api/launches";
import type { LaunchesResponse } from "../../types/launch";
import style from "./Launches.module.css";

function Launches() {

    const [data, setData] = useState<LaunchesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    
    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const result = await getLaunches(page);
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
      }, [page]);
      
      if (loading) {
          return <p>Loading...</p>;
      }
      
      return (
        <>
        <div>
          <NavBar />
          <h1>Launches</h1>
          <ul style={{listStyle: "none"}}>
            {data?.docs.map((launch) => (
              <li key={launch.id} className={style.launch}>
                <h3>{launch.name}</h3>
                <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
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