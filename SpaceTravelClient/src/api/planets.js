import { apiGet } from "./httpClient";

export const getPlanets = () => apiGet("/api/planets");
