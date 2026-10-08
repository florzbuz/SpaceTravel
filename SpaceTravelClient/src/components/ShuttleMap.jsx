import { getShuttlePosition } from "../utils/getShuttlePosition";

const ShuttleMap = ({ planets, shuttles }) => {
    return (
        <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">

            {/* Planets */}
            {planets.map(p => (
                <div
                    key={p.id}
                    className="absolute w-4 h-4 bg-blue-400 rounded-full"
                    style={{ left: p.x, top: p.y }}
                >
                    <span className="absolute left-5 top-[-4px] text-xs text-gray-200">
                        {p.name}
                    </span>
                </div>
            ))}

            {/* Shuttles */}
            {shuttles.map(s => {
                const pos = getShuttlePosition(s, planets);

                if (s.status === 1) {
                    // EnRoute → animated dot
                    return (
                        <div
                            key={s.id}
                            className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-pulse"
                            style={{ left: pos.x, top: pos.y }}
                            title={`${s.name} (${Math.round(pos.progress * 100)}%)`}
                        />
                    );
                }

                // Idle → static dot
                const planet = planets.find(p => p.id === s.currentPlanetId);
                if (!planet) return null;

                return (
                    <div
                        key={s.id}
                        className="absolute w-4 h-4 bg-green-400 rounded-full"
                        style={{ left: planet.x, top: planet.y }}
                        title={`${s.name} (Idle @ ${planet.name})`}
                    />
                );
            })}

            {/* Debug panel — OUTSIDE shuttle loop */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 p-3 rounded text-xs text-gray-200">
                <h3 className="font-semibold mb-2">Shuttle Debug</h3>
                {shuttles.map(s => {
                    const pos = getShuttlePosition(s, planets);
                    return (
                        <div key={s.id} className="mb-1">
                            <span className="font-semibold">{s.name}</span>{" "}
                            | status: {s.status} | origin: {s.originPlanetId} → dest: {s.destinationPlanetId}{" "}
                            | progress: {pos.progress.toFixed(2)} | x: {Math.round(pos.x)}, y: {Math.round(pos.y)}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ShuttleMap;
