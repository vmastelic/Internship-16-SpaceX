import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { getCompanySummary } from "../../api/company";
import { getNextLaunch, type NextLaunch } from "../../api/launches";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import style from "./Home.module.css";

function Home() {
    const [error, setError] = useState("");
    const [summary, setSummary] = useState("");
    const [nextLaunch, setNextLaunch] = useState<NextLaunch | null>(null);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [summaryData, nextLaunchData] = await Promise.all([
                    getCompanySummary(),
                    getNextLaunch(),
                ]);
                
                setSummary(summaryData);
                setNextLaunch(nextLaunchData);
            } catch (error) {
                console.error("Error fetching home data:", error);
                setError("Failed to fetch home data");
            } finally {
                setLoading(false);
            }
        };
        
        fetchHomeData();
    }, []);
    
    useEffect(() => {
        if (!nextLaunch) return;
        
        const updateCountdown = () => {
            const distance =
            new Date(nextLaunch.date_utc).getTime() - new Date().getTime();
            
            if (distance <= 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            
            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((distance / (1000 * 60)) % 60),
                seconds: Math.floor((distance / 1000) % 60),
            });
        };
        
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        
        return () => clearInterval(interval);
    }, [nextLaunch]);
    
    if (loading) return <LoadingSpinner />;
    if (error) return <p>{error}</p>;
    
    return (
        <div className={style.home}>
      <NavBar />

      <div className={style.overlay}>
        <div className={style.heroCard}>
          <h1 className={style.title}>SpaceX Mission Control</h1>

          <p className={style.launchName}>{nextLaunch?.name}</p>

          <div className={style.countdown}>
            <div className={style.timeBox}>
              <span className={style.timeValue}>{countdown.days}</span>
              <span className={style.timeLabel}>Days</span>
            </div>

            <div className={style.timeBox}>
              <span className={style.timeValue}>{countdown.hours}</span>
              <span className={style.timeLabel}>Hours</span>
            </div>

            <div className={style.timeBox}>
              <span className={style.timeValue}>{countdown.minutes}</span>
              <span className={style.timeLabel}>Minutes</span>
            </div>

            <div className={style.timeBox}>
              <span className={style.timeValue}>{countdown.seconds}</span>
              <span className={style.timeLabel}>Seconds</span>
            </div>
          </div>

          <div className={style.infoBlock}>
            <h2>About SpaceX</h2>
            <p className={style.summary}>{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;