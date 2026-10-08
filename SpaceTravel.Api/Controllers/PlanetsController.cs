using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/planets")]
public class PlanetsController : ControllerBase
{
    private readonly IPlanetService _planetService;

    public PlanetsController(IPlanetService planetService)
    {
        _planetService = planetService;
    }

    [HttpGet]
    public IActionResult GetPlanets()
        => Ok(_planetService.GetAllPlanets());
}
