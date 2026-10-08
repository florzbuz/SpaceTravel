using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/shuttles")]
public class ShuttlesController : ControllerBase
{
    private readonly IShuttleService _shuttleService;

    public ShuttlesController(IShuttleService shuttleService)
    {
        _shuttleService = shuttleService;
    }

    [HttpGet]
    public IActionResult GetShuttles()
        => Ok(_shuttleService.GetAllShuttles());
}
