// shuttleUtils.js
export const getShuttlePosition = (shuttle, planets) => {
    const origin = planets.find(p => p.id === shuttle.originPlanetId);
    const dest = planets.find(p => p.id === shuttle.destinationPlanetId);

    if (!origin || !dest) return { x: 0, y: 0, progress: 0 };

    const departure = Date.parse(shuttle.departureTime);
    const arrival = Date.parse(shuttle.arrivalTime);
    const now = Date.now();

    if (!departure || !arrival || arrival <= departure) {
        return { x: origin.x, y: origin.y, progress: 0 };
    }

    const rawProgress = (now - departure) / (arrival - departure);
    const progress = Math.min(1, Math.max(0, rawProgress));

    return {
        x: origin.x + (dest.x - origin.x) * progress,
        y: origin.y + (dest.y - origin.y) * progress,
        progress
    };
};
