using System.Text.Json;

public class JsonTravelHistoryStore : ITravelHistoryStore
{
    private const string FilePath = "travel-history.json";

    public void SaveTrip(Trip trip)
    {
        var trips = LoadTrips().ToList();
        trips.Add(trip);

        var json = JsonSerializer.Serialize(trips, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(FilePath, json);
    }

    public IEnumerable<Trip> LoadTrips()
    {
        if (!File.Exists(FilePath))
            return Enumerable.Empty<Trip>();

        var json = File.ReadAllText(FilePath);
        return JsonSerializer.Deserialize<List<Trip>>(json) ?? new List<Trip>();
    }
}
