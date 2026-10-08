const StatsPanel = ({ trips }) => {
  const countsByPlanet = trips.reduce((acc, trip) => {
    acc[trip.destinationPlanetId] =
      (acc[trip.destinationPlanetId] || 0) + 1;
    return acc;
  }, {});

  const mostTraveledPlanetId =
    Object.entries(countsByPlanet).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="stats-panel">
      <h3>Stats</h3>
      <p>Most traveled planet: {mostTraveledPlanetId || "N/A"}</p>
      <ul>
        {Object.entries(countsByPlanet).map(([planetId, count]) => (
          <li key={planetId}>
            {planetId}: {count} trips
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsPanel;
