import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Launches.module.css";
import { useSearchParams } from "react-router-dom";
import { useLaunches } from "../../hooks/useLaunches";
import LaunchList from "../../components/LaunchList/LaunchList";
import withLoading from "../../hoc/withLoading";

const LaunchListWithLoading = withLoading(LaunchList);

function Launches() {

    const [page, setPage] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const filter = (searchParams.get("filter") as "all" | "success" | "failed" | "upcoming") || "all";
    
    const { data, loading } = useLaunches(page, search, filter);

      const updateParam = (key: string, value: string) => {
          const params = new URLSearchParams(searchParams);
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
      
          if (key !== "page") {
            params.set("page", "1");
            setPage(1);
          }
          
          setSearchParams(params);
        };

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
          <select value={filter} onChange={(e) => updateParam("filter", e.target.value)}>
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="upcoming">Upcoming</option>
          </select>

          <LaunchListWithLoading
            loading={loading && !data}
            launches={data?.docs || []}
          />
        </div>

        <div className={style.paging}>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={!data?.hasPrevPage}>
                Prev
            </button>

            <button onClick={() => setPage((prev) => prev + 1)} disabled={!data?.hasNextPage}>
                Next
            </button>
            <div>Page {page}</div>
        </div>


        </>
      );
}

export default Launches;