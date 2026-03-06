import { useEffect } from "react";
import NavBar from "../../components/NavBar";
import { getLaunches } from "../../api/launches";

function Launches(){

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const data = await getLaunches();
                console.log(data.docs);
            } catch (error) {
                console.error('Error fetching launches:', error);
            }
        };

        fetchLaunches();
    }, []);

    return(
        <div>
            <NavBar/>
            <h1>Launches</h1>
        </div>
    )
}

export default Launches;