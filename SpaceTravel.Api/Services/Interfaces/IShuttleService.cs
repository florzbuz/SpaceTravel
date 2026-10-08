public interface IShuttleService
{
    IEnumerable<Shuttle> GetAllShuttles();
    Shuttle? GetBestShuttleForPlanet(string planetId);
    void UpdateShuttle(Shuttle shuttle);
}
