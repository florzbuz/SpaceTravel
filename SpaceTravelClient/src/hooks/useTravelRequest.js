import { useState } from "react";
import { requestTravel } from "../api/travel";

export const useTravelRequest = () => {
  const [loading, setLoading] = useState(false);

  const submitRequest = async (payload) => {
    setLoading(true);
    try {
      return await requestTravel(payload);
    } finally {
      setLoading(false);
    }
  };

  return { submitRequest, loading };
};
