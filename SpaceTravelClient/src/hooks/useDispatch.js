import { useState } from "react";
import { dispatchTravel } from "../api/travel";

export const useDispatch = () => {
  const [loading, setLoading] = useState(false);

  const runDispatch = async () => {
    setLoading(true);
    try {
      return await dispatchTravel();
    } finally {
      setLoading(false);
    }
  };

  return { runDispatch, loading };
};
