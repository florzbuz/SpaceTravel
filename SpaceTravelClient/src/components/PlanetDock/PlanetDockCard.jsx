const PlanetDockCard = ({ planet, onRequest }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{planet.name}</h3>
            <p className="text-gray-400 mb-4">Distance rank: {planet.distanceRank}</p>

            <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium"
                onClick={() => onRequest(planet)}
            >
                Request Travel
            </button>
        </div>
    );
};

export default PlanetDockCard;
