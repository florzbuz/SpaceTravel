import { apiGet, apiPost } from "./httpClient";

export const requestTravel = (payload) =>
  apiPost("/api/travel/request", payload);

export const dispatchTravel = () =>
  apiPost("/api/travel/dispatch", {});

export const getTravelHistory = () =>
  apiGet("/api/travel/history"); // you can add this endpoint later
