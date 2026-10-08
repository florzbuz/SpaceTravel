public class TravelService : ITravelService
{
    private readonly Dictionary<string, List<Passenger>> _queues = new();

    public Passenger QueuePassenger(Passenger passenger)
    {
        if (!_queues.ContainsKey(passenger.OriginPlanetId))
            _queues[passenger.OriginPlanetId] = new List<Passenger>();

        _queues[passenger.OriginPlanetId].Add(passenger);
        return passenger;
    }

    public IEnumerable<Passenger> GetQueuedPassengers(string planetId)
    {
        return _queues.ContainsKey(planetId)
            ? _queues[planetId]
            : Enumerable.Empty<Passenger>();
    }

    public void RemovePassengers(string planetId, IEnumerable<Passenger> passengers)
    {
        if (!_queues.ContainsKey(planetId)) return;

        foreach (var p in passengers)
            _queues[planetId].Remove(p);
    }

    public Dictionary<string, List<Passenger>> GetAllQueues()
    {
        return _queues;
    }
}
