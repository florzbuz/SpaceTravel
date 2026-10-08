import { useState } from "react";
import Home from "./pages/Home";
import ShuttlesPage from "./pages/ShuttlesPage";
import HistoryPage from "./pages/HistoryPage";
import StatsPage from "./pages/StatsPage";
import { useLiveDispatch } from "./hooks/useLiveDispatch";

const App = () => {
    useLiveDispatch(8000); // dispatch every 8 seconds
    const [page, setPage] = useState("home");
    const [simulationOn, setSimulationOn] = useState(false);

    const [simulationSpeed, setSimulationSpeed] = useState(5000); // default 5s
    const [surge, setSurge] = useState(false);

    const toggleSimulation = () => {
        setSimulationOn(prev => !prev);
    };

    const triggerSurge = () => {
        setSurge(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center gap-6">
                <h1 className="text-2xl font-bold tracking-wide">Space Travel Control Center</h1>

                <nav className="flex gap-4 ml-auto">
                    <button
                        className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                        onClick={() => setPage("home")}
                    >
                        Planet Docks
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                        onClick={() => setPage("shuttles")}
                    >
                        Shuttles
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                        onClick={() => setPage("history")}
                    >
                        History
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                        onClick={() => setPage("stats")}
                    >
                        Stats
                    </button>

                    <button
                        className={`px-4 py-2 rounded font-semibold ${simulationOn ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"
                            }`}
                        onClick={toggleSimulation}
                    >
                        {simulationOn ? "Simulation ON" : "Simulation OFF"}
                    </button>
                    <input
                        type="range"
                        min="1000"
                        max="30000"
                        step="1000"
                        value={simulationSpeed}
                        onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                        className="w-40"
                    />
                    <span>{simulationSpeed / 1000}s</span>
                    <button
                        disabled={surge}
                        className={`px-4 py-2 rounded ${surge ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-500"}`}
                        onClick={triggerSurge}
                    >
                        {surge ? "Surging..." : "Passenger Surge"}
                    </button>
                </nav>
            </header>

            <main className="p-6">
                {page === "home" && <Home simulationOn={simulationOn} simulationSpeed={simulationSpeed} surge={surge} setSurge={setSurge} />}
                {page === "shuttles" && <ShuttlesPage />}
                {page === "history" && <HistoryPage />}
                {page === "stats" && <StatsPage />}
            </main>
        </div>
    );
};

export default App;
