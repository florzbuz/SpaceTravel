import { useTravelHistory } from "../hooks/useTravelHistory";
import TravelHistoryTable from "../components/TravelHistory/TravelHistoryTable";
import Spinner from "../components/Spinner";

const HistoryPage = () => {
  const { data: history = [], isLoading } = useTravelHistory();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h2>Travel History</h2>
      <TravelHistoryTable trips={history} />
    </div>
  );
};

export default HistoryPage;
