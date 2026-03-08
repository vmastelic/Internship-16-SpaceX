import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getLaunchById } from "../../api/launches";
import { getRocketById } from "../../api/rockets";
import type { LaunchDetail } from "../../types/launch";
import type { Rocket } from "../../types/rocket";

function LaunchDetails() {
  const { id } = useParams();
  
  const [launch, setLaunch] = useState<LaunchDetail | null>(null);
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLaunchDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const launchData = await getLaunchById(id);
        setLaunch(launchData);
        
        const rocketData = await getRocketById(launchData.rocket);
        setRocket(rocketData);
      } catch (error) {
        console.error("Error fetching launch details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLaunchDetails();
  }, [id]);
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      <NavBar />

      <h1>{launch?.name}</h1>

      {launch?.links.patch.large && (
        <img
        src={launch.links.patch.large}
        alt={launch.name}
        width={200}
        />
      )}

      <p>
        <strong>Date:</strong>{" "}
        {launch && new Date(launch.date_utc).toLocaleDateString("hr-HR")}
      </p>

      <p>
        <strong>Rocket:</strong> {rocket?.name}
      </p>

      {launch?.failures && launch.failures.length > 0 && (
        <div>
          <h3>Failure details</h3>
          {launch.failures.map((failure, index) => (
            <p key={index}>{failure.reason}</p>
          ))}
        </div>
      )}

      {launch?.links.webcast && (
        <p>
          <a
            href={launch.links.webcast}
            target="_blank"
            rel="noreferrer"
            >
            Watch on YouTube
          </a>
        </p>
      )}
    </div>
  );
}

export default LaunchDetails;