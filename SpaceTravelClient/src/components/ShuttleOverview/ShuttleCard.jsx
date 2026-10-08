const ShuttleCard = ({ shuttle }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold mb-2">{shuttle.name}</h3>

            <p className="text-gray-400">Status: {shuttle.status}</p>
            <p className="text-gray-400">Current planet: {shuttle.currentPlanetId}</p>
            <p className="text-gray-400">Passengers: {shuttle.passengerCount}</p>
            <p className="text-gray-400">Total weight: {shuttle.totalWeightKg} kg</p>
        </div>
    );
};


export default ShuttleCard;
