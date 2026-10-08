import { apiGet } from "./httpClient";

export const getQueue = () => apiGet("/api/travel/queue");