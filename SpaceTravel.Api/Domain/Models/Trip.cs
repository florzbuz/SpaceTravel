public class Trip
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string ShuttleId { get; set; }
    public string OriginPlanetId { get; set; }
    public string DestinationPlanetId { get; set; }

    public int PassengerCount { get; set; }
    public int TotalWeightKg { get; set; }

    public DateTime DepartureTime { get; set; }
    public DateTime ArrivalTime { get; set; }
}
