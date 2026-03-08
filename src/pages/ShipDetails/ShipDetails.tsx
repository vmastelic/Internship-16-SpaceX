import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getShipById } from "../../api/ships";
import type { ShipDetail } from "../../types/ship";

function ShipDetails() {
    const { id } = useParams();
    const [ship, setShip] = useState<ShipDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchShip = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                setError("");
                
                const data = await getShipById(id);
                setShip(data);
            } catch (error) {
                setError("Failed to fetch ship details");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchShip();
    }, [id]);
    
    if (loading) return <LoadingSpinner />;
    if (error) return <p>{error}</p>;
    
    return (
        <div>
      <NavBar />

      <h1>{ship?.name}</h1>

      {ship?.image ? (
          <img src={ship.image} alt={ship.name} width={300} />
        ) : (
            <p>No image available</p>
        )}

      <p>
        <strong>Type:</strong> {ship?.type || "Unknown"}
      </p>

      <p>
        <strong>Status:</strong> {ship?.active ? "Active" : "Inactive"}
      </p>

      <p>
        <strong>Year built:</strong> {ship?.year_built || "Unknown"}
      </p>

      <p>
        <strong>Home port:</strong> {ship?.home_port || "Unknown"}
      </p>

      <p>
        <strong>Model:</strong> {ship?.model || "Unknown"}
      </p>

      <p>
        <strong>Mass:</strong> {ship?.mass_kg ? `${ship.mass_kg} kg` : "Unknown"}
      </p>

      <p>
        <strong>Launches count:</strong> {ship?.launches.length || 0}
      </p>

      <div>
        <strong>Roles:</strong>
        {ship?.roles.length ? (
            <ul style={{listStyle:"none"}}>
            {ship.roles.map((role) => (
                <li key={role}>{role}</li>
            ))}
          </ul>
        ) : (
            <p>No roles available</p>
        )}
      </div>

      {ship?.url && (
          <p>
          <a href={ship.url} target="_blank" rel="noreferrer">
            More info
          </a>
        </p>
      )}
    </div>
  );
}

export default ShipDetails;