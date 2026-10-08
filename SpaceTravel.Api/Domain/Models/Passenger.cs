public class Passenger
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Species { get; set; }
    public int WeightKg { get; set; }
    public string OriginPlanetId { get; set; }
    public string DestinationPlanetId { get; set; }
}
