import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTravelHistory } from "../api/travel";
import ErrorContext from "../context/ErrorContext";

export const useTravelHistory = () => {
    const { setError } = useContext(ErrorContext);

    return useQuery({
        queryKey: ["history"],
        queryFn: getTravelHistory,
        onError: (err) => setError(err.message),
        refetchInterval: 5000
    });
};