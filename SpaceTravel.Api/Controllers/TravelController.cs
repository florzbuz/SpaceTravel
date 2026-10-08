using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/travel")]
public class TravelController : ControllerBase
{
    private readonly ITravelService _travelService;
    private readonly IDispatchService _dispatchService;
    private readonly ITravelHistoryStore _historyStore;

    public TravelController(ITravelService travelService, IDispatchService dispatchService, ITravelHistoryStore historyStore)
    {
        _travelService = travelService;
        _dispatchService = dispatchService;
        _historyStore = historyStore;
    }

    [HttpPost("request")]
    public IActionResult RequestTravel([FromBody] Passenger passenger)
        => Ok(_travelService.QueuePassenger(passenger));

    [HttpPost("dispatch")]
    public IActionResult Dispatch()
        => Ok(_dispatchService.DispatchAll());

    [HttpGet("history")]
    public IActionResult GetHistory()
    {
        return Ok(_historyStore.LoadTrips());
    }

    [HttpGet("queue")]
    public IActionResult GetQueue()
    {
        return Ok(_travelService.GetAllQueues());
    }
}
