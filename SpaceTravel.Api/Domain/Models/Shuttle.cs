using System.Text.Json.Serialization;

public class Shuttle
{
    public string Id { get; set; }
    public string Name { get; set; }
    public ShuttleStatus Status { get; set; }
    public string CurrentPlanetId { get; set; }

    public string OriginPlanetId { get; set; }
    public string DestinationPlanetId { get; set; }

    //[JsonConverter(typeof(JsonStringEnumConverter))]
    public DateTime DepartureTime { get; set; }

    //[JsonConverter(typeof(JsonStringEnumConverter))]
    public DateTime ArrivalTime { get; set; }

    public int PassengerCount { get; set; }
    public int TotalWeightKg { get; set; }
}
