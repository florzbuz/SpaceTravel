import { useTravelHistory } from "../hooks/useTravelHistory";
import { usePassengerQueue } from "../hooks/usePassengerQueue";
import StatsPanel from "../components/Stats/StatsPanel";
import Spinner from "../components/Spinner";
import PassengerQueueViewer from "../components/PassengerQueueViewer";

const StatsPage = () => {
    const { data: history = [], isLoading } = useTravelHistory();
    const { data: queue = [] } = usePassengerQueue();

    if (isLoading) return <Spinner />;

    return (
        <div>
            <h2>Stats</h2>
            <StatsPanel trips={history} />
            <PassengerQueueViewer queue={queue} />
        </div>
    );
};

export default StatsPage;
