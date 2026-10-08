import { useEffect } from "react";
import { dispatchTravel } from "../api/travel";

export const useLiveDispatch = (intervalMs = 8000) => {
    useEffect(() => {
        const id = setInterval(() => {
            dispatchTravel().catch(() => { });
        }, intervalMs);

        return () => clearInterval(id);
    }, [intervalMs]);
};
