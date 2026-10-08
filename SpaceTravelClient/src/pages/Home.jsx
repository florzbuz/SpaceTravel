import { useState, useEffect } from "react";
import { usePlanets } from "../hooks/usePlanets";
import { useTravelRequest } from "../hooks/useTravelRequest";
import { useDispatch } from "../hooks/useDispatch";
import PlanetDockList from "../components/PlanetDock/PlanetDockList";
import TravelRequestForm from "../components/TravelRequest/TravelRequestForm";
import Spinner from "../components/Spinner";

const Home = ({ simulationOn, simulationSpeed, surge, setSurge }) => {
    const { data: planets = [], isLoading } = usePlanets();
    const { submitRequest, loading: requestLoading } = useTravelRequest();
    const { runDispatch, loading: dispatchLoading } = useDispatch();

    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [log, setLog] = useState([]);

    const planetWeights = {
        Angel1: 5,
        Boreth: 3,
        Aurelia: 2,
        BlueHorizon: 1,
        ArgusX: 1
    };

    const weightedRandomPlanet = () => {
        const weightedList = planets.flatMap(p =>
            Array(planetWeights[p.id] || 1).fill(p)
        );
        return weightedList[Math.floor(Math.random() * weightedList.length)];
    };

    useEffect(() => {
        if (!surge) return;
        if (planets.length < 2) return;

        const generateSurge = async () => {
            for (let i = 0; i < 10; i++) {
                const origin = weightedRandomPlanet();
                let destination = weightedRandomPlanet();
                while (destination.id === origin.id) {
                    destination = weightedRandomPlanet();
                }

                const species = randomSpeciesForPlanet(origin.id);
                const passenger = {
                    originPlanetId: origin.id,
                    destinationPlanetId: destination.id,
                    species,
                    weightKg: randomWeight(species)
                };

                await submitRequest(passenger);

                setLog(prev => [
                    ...prev,
                    `Generated passenger: ${origin.name} → ${destination.name} (${passenger.species})`
                ]);
            }

            await runDispatch();
            setSurge(false); // now valid
        };

        generateSurge();
    }, [surge, planets, submitRequest, runDispatch, setSurge]);

    useEffect(() => {
        if (!simulationOn) return;
        if (planets.length < 2) return;

        const timer = setInterval(async () => {
            const origin = planets[Math.floor(Math.random() * planets.length)];
            let destination = planets[Math.floor(Math.random() * planets.length)];

            while (destination.id === origin.id) {
                destination = weightedRandomPlanet();
            }

            const species = randomSpeciesForPlanet(origin.id);
            const passenger = {
                originPlanetId: origin.id,
                destinationPlanetId: destination.id,
                species,
                weightKg: randomWeight(species)
            };

            await submitRequest(passenger);
            await runDispatch();

            setLog(prev => [
                ...prev,
                `Generated passenger: ${origin.name} → ${destination.name} (${passenger.species})`
            ]);

        }, simulationSpeed);

        return () => clearInterval(timer);
    }, [simulationOn, planets, simulationSpeed, submitRequest, runDispatch]);

    if (isLoading) return <Spinner />;

    const handleRequestClick = (planet) => {
        setSelectedPlanet(planet);
    };

    const handleSubmitRequest = async (payload) => {
        await submitRequest(payload);
        await runDispatch(); // auto-dispatch after each request
    };

    return (
        <div>
            <h2>Planet Docks</h2>
            <PlanetDockList planets={planets} onRequest={handleRequestClick} />

            {selectedPlanet && (
                <TravelRequestForm
                    originPlanet={selectedPlanet}
                    planets={planets}
                    onSubmit={handleSubmitRequest}
                    loading={requestLoading || dispatchLoading}
                />
            )}

            <div className="bg-gray-800 p-4 rounded mt-6 max-h-64 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2">Simulation Log</h3>
                {log.map((entry, i) => (
                    <div key={i} className="text-gray-300 text-sm">{entry}</div>
                ))}
            </div>
        </div>
    );
};

export default Home;

// Helpers
const speciesWeightRanges = {
    Human: [60, 120],
    Andorian: [70, 140],
    Vulcan: [80, 160],
    Klingon: [100, 200],
    Betazoid: [55, 110],
    Tellarite: [90, 180]
};

const randomWeight = (species) => {
    const [min, max] = speciesWeightRanges[species];
    return Math.floor(Math.random() * (max - min)) + min;
};

const planetSpeciesDistribution = {
    Angel1: ["Human", "Betazoid"],
    Boreth: ["Klingon"],
    Aurelia: ["Vulcan", "Andorian"],
    BlueHorizon: ["Human", "Tellarite"],
    ArgusX: ["Andorian", "Tellarite"]
};

const randomSpeciesForPlanet = (planetId) => {
    const list = planetSpeciesDistribution[planetId] || ["Human"];
    return list[Math.floor(Math.random() * list.length)];
};



