var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Domain services
builder.Services.AddSingleton<IPlanetService, PlanetService>();
builder.Services.AddSingleton<IShuttleService, ShuttleService>();
builder.Services.AddSingleton<ITravelService, TravelService>();
builder.Services.AddSingleton<IDispatchService, DispatchService>();

// Persistence
builder.Services.AddSingleton<ITravelHistoryStore, JsonTravelHistoryStore>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:65448")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowReact");

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
