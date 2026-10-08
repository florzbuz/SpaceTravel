public class ShuttleService : IShuttleService
{
    private readonly List<Shuttle> _shuttles = new()
    {
        new Shuttle { Id = "s1", Name = "Voyager", Status = ShuttleStatus.Idle, CurrentPlanetId = "angel1" },
        new Shuttle { Id = "s2", Name = "Odyssey", Status = ShuttleStatus.Idle, CurrentPlanetId = "boreth" },
        new Shuttle { Id = "s3", Name = "Endeavour", Status = ShuttleStatus.Idle, CurrentPlanetId = "aurelia" }
    };

    public IEnumerable<Shuttle> GetAllShuttles() => _shuttles;

    public Shuttle? GetBestShuttleForPlanet(string planetId)
    {
        //return _shuttles
        //    .Where(s => s.Status == ShuttleStatus.Idle)
        //    .OrderBy(s => Math.Abs(GetRank(s.CurrentPlanetId) - GetRank(planetId)))
        //    .FirstOrDefault();

        return _shuttles
            .OrderBy(s => Math.Abs(GetRank(s.CurrentPlanetId) - GetRank(planetId)))
            .FirstOrDefault();
    }

    private int GetRank(string planetId)
    {
        return planetId switch
        {
            "angel1" => 1,
            "boreth" => 2,
            "aurelia" => 3,
            "bluehorizon" => 4,
            "argusx" => 5,
            _ => 99
        };
    }

    public void UpdateShuttle(Shuttle shuttle)
    {
        var existing = _shuttles.First(s => s.Id == shuttle.Id);

        // Always update status
        existing.Status = shuttle.Status;

        // If shuttle has arrived, snap to destination
        if (DateTime.UtcNow >= shuttle.ArrivalTime)
        {
            existing.CurrentPlanetId = shuttle.DestinationPlanetId;
            existing.Status = ShuttleStatus.Idle;
        }
        else
        {
            // While traveling, keep origin planet
            existing.CurrentPlanetId = shuttle.OriginPlanetId;
        }

        existing.PassengerCount = shuttle.PassengerCount;
        existing.TotalWeightKg = shuttle.TotalWeightKg;
    }
}
