import { useShuttles } from "../hooks/useShuttles";
import { usePlanets } from "../hooks/usePlanets";
import ShuttleList from "../components/ShuttleOverview/ShuttleList";
import ShuttleMap from "../components/ShuttleMap";

const ShuttlesPage = () => {
  const { data: shuttles = [], isLoading } = useShuttles();
  const { data: planets = [] } = usePlanets();

  if (isLoading) return <div>Loading shuttles...</div>;

  return (
    <div>
      <h2>Shuttle Dashboard</h2>
      <ShuttleList shuttles={shuttles} />
      <ShuttleMap shuttles={shuttles} planets={planets} />
    </div>
  );
};

export default ShuttlesPage;
