export const getShuttlePosition = (shuttle, planets) => {
    const origin = planets.find(p => p.id === shuttle.originPlanetId);
    const dest = planets.find(p => p.id === shuttle.destinationPlanetId);

    if (!origin || !dest) return { x: 0, y: 0 };

    const now = Date.now();
    const departure = new Date(shuttle.departureTime).getTime();
    const arrival = new Date(shuttle.arrivalTime).getTime();

    const progress = Math.min(1, (now - departure) / (arrival - departure));

    return {
        x: origin.x + (dest.x - origin.x) * progress,
        y: origin.y + (dest.y - origin.y) * progress
    };
};
