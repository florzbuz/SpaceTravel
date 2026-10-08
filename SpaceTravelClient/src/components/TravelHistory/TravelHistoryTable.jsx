const TravelHistoryTable = ({ trips }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Shuttle</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Passengers</th>
          <th>Total weight</th>
          <th>Departure</th>
          <th>Arrival</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((t) => (
          <tr key={t.id}>
            <td>{t.shuttleId}</td>
            <td>{t.originPlanetId}</td>
            <td>{t.destinationPlanetId}</td>
            <td>{t.passengerCount}</td>
            <td>{t.totalWeightKg}</td>
            <td>{new Date(t.departureTime).toLocaleString()}</td>
            <td>{new Date(t.arrivalTime).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TravelHistoryTable;
