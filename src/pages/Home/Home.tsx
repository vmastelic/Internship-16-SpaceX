import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { getCompanySummary } from "../../api/company";
import LoadingSpinner from "../../components/LoadingSpinner";

function Home(){

    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getCompanySummary();
                setSummary(data);
            } catch (error) {
                console.error('Error fetching company summary:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) return <LoadingSpinner />;

    return(
        <div>
            <NavBar/>
            <h1>Home</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <p>{summary}</p>
            )}
        </div>
    )
}

export default Home;