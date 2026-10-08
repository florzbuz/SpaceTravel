import PlanetDockCard from "./PlanetDockCard";

const PlanetDockList = ({ planets, onRequest }) => {
    if (!planets || planets.length === 0)
        return <div className="text-gray-400">No planets available</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planets.map((p) => (
                <PlanetDockCard key={p.id} planet={p} onRequest={onRequest} />
            ))}
        </div>
    );
};

export default PlanetDockList;
