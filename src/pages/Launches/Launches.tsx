import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { getLaunches } from "../../api/launches";
import type { LaunchesResponse } from "../../types/launch";

function Launches() {

    const [data, setData] = useState<LaunchesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const result = await getLaunches();
                console.log(result.docs);
                setData(result);
              } catch (error) {
                  console.error("Error fetching launches:", error);
              } finally {
                  setLoading(false);
              }
          };
          
          fetchLaunches();
      }, []);
      
      if (loading) {
          return <p>Loading...</p>;
      }
      
      return (
        <div>
          <NavBar />
          <h1>Launches</h1>
          <ul style={{listStyle: "none"}}>
            {data?.docs.map((launch) => (
              <li key={launch.id}>
                <h2>{launch.name}</h2>
                <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Launches;