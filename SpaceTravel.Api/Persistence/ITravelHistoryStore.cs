public interface ITravelHistoryStore
{
    void SaveTrip(Trip trip);
    IEnumerable<Trip> LoadTrips();
}
