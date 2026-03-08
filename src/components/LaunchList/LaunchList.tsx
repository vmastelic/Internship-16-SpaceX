import type { Launch } from "../../types/launch";
import style from "../../pages/Launches/Launches.module.css";

type LaunchListProps = {
  launches: Launch[];
};

function LaunchList({ launches }: LaunchListProps) {
  return (
    <ul style={{ listStyle: "none" }}>
      {launches.map((launch) => (
        <li key={launch.id} className={style.launch}>
          <h3>{launch.name}</h3>
          <p>Date: {new Date(launch.date_utc).toLocaleDateString("hr-HR")}</p>
        </li>
      ))}
    </ul>
  );
}

export default LaunchList;