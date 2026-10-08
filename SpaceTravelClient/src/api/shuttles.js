import { apiGet } from "./httpClient";

export const getShuttles = () => apiGet("/api/shuttles");
