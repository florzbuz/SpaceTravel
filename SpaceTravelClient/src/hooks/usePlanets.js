import { useQuery } from "@tanstack/react-query";
import { getPlanets } from "../api/planets";
import { useContext } from "react";
import ErrorContext from "../context/ErrorContext";
import { planetCoordinates } from "../utils/planetCoordinates";

export const usePlanets = () => {
    const { setError } = useContext(ErrorContext);

    const query = useQuery({
        queryKey: ["planets"],
        queryFn: getPlanets,
        onError: (err) => setError(err.message),
        refetchInterval: 5000
    });

    // Inject coordinates
    const planetsWithCoords = (query.data || []).map(p => ({
        ...p,
        ...planetCoordinates[p.id]   // adds x,y
    }));

    return {
        ...query,
        data: planetsWithCoords
    };
};
