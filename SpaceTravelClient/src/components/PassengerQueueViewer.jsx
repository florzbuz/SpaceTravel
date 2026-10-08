// PassengerQueueViewer.jsx

const PassengerQueueViewer = ({ queue }) => {
    return (
        <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Passenger Queues</h3>

            {Object.entries(queue).map(([planetId, passengers]) => (
                <div key={planetId} className="mb-4">
                    <h4 className="font-semibold">{planetId}</h4>

                    <ul className="text-sm text-gray-300">
                        {passengers.map((p, i) => (
                            <li key={i}>
                                {p.species} → {p.destinationPlanetId} ({p.weightKg}kg)
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PassengerQueueViewer;
