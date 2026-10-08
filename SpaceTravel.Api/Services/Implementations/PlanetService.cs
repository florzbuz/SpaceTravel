public class PlanetService : IPlanetService
{
    private readonly List<Planet> _planets = new()
    {
        new Planet { Id = "angel1", Name = "Angel 1", DistanceRank = 1, x = 120, y = 80 },
        new Planet { Id = "boreth", Name = "Boreth", DistanceRank = 2, x = 120, y = 80 },
        new Planet { Id = "aurelia", Name = "Aurelia", DistanceRank = 3, x = 120, y = 80 },
        new Planet { Id = "bluehorizon", Name = "Blue Horizon", DistanceRank = 4, x = 120, y = 80 },
        new Planet { Id = "argusx", Name = "Argus X", DistanceRank = 5, x = 120, y = 80 }
    };

    public IEnumerable<Planet> GetAllPlanets() => _planets;
}
