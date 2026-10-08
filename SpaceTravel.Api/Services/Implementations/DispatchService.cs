using System.Numerics;

public class DispatchService : IDispatchService
{
    private readonly IPlanetService _planetService;
    private readonly IShuttleService _shuttleService;
    private readonly ITravelService _travelService;
    private readonly ITravelHistoryStore _historyStore;

    public DispatchService(
        IPlanetService planetService,
        IShuttleService shuttleService,
        ITravelService travelService,
        ITravelHistoryStore historyStore)
    {
        _planetService = planetService;
        _shuttleService = shuttleService;
        _travelService = travelService;
        _historyStore = historyStore;
    }

    public IEnumerable<Trip> DispatchAll()
    {
        var trips = new List<Trip>();

        foreach (var planet in _planetService.GetAllPlanets())
        {
            var queue = _travelService.GetQueuedPassengers(planet.Id).ToList();

            //Console.WriteLine($"Pending requests: {queue.Count}");

            if (!queue.Any()) continue;

            var shuttle = _shuttleService.GetBestShuttleForPlanet(planet.Id);
            if (shuttle == null) continue;

            if (shuttle.Status == ShuttleStatus.EnRoute)
                continue;

            var loaded = LoadPassengers(queue);

            _travelService.RemovePassengers(planet.Id, loaded);

            var trip = CreateTrip(shuttle, loaded);
            trips.Add(trip);

            _historyStore.SaveTrip(trip);
            _shuttleService.UpdateShuttle(shuttle);
        }

        return trips;
    }

    private List<Passenger> LoadPassengers(List<Passenger> queue)
    {
        var loaded = new List<Passenger>();
        int count = 0;
        int weight = 0;

        foreach (var p in queue)
        {
            if (count + 1 > 20) break;
            if (weight + p.WeightKg > 4000) break;

            loaded.Add(p);
            count++;
            weight += p.WeightKg;
        }

        return loaded;
    }

    private Trip CreateTrip(Shuttle shuttle, List<Passenger> passengers)
    {
        var origin = passengers.First().OriginPlanetId;
        var destination = passengers.First().DestinationPlanetId;

        shuttle.PassengerCount = passengers.Count;
        shuttle.TotalWeightKg = passengers.Sum(p => p.WeightKg);
        //shuttle.CurrentPlanetId = destination;
        shuttle.Status = ShuttleStatus.EnRoute;
        shuttle.OriginPlanetId = origin;
        shuttle.DestinationPlanetId = destination;

        shuttle.DepartureTime = DateTime.UtcNow;
        shuttle.ArrivalTime = DateTime.UtcNow.AddMinutes(5);

        return new Trip
        {
            ShuttleId = shuttle.Id,
            OriginPlanetId = origin,
            DestinationPlanetId = destination,
            PassengerCount = passengers.Count,
            TotalWeightKg = passengers.Sum(p => p.WeightKg),
            DepartureTime = shuttle.DepartureTime,
            ArrivalTime = shuttle.ArrivalTime
        };
    }
}
