public interface ITravelService
{
    Passenger QueuePassenger(Passenger passenger);
    IEnumerable<Passenger> GetQueuedPassengers(string planetId);
    void RemovePassengers(string planetId, IEnumerable<Passenger> passengers);
    Dictionary<string, List<Passenger>> GetAllQueues();
}
