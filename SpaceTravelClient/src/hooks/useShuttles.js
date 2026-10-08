import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getShuttles } from "../api/shuttles";
import ErrorContext from "../context/ErrorContext";

export const useShuttles = () => {
    const { setError } = useContext(ErrorContext);

    return useQuery({
        queryKey: ["shuttles"],
        queryFn: getShuttles,
        onError: (err) => setError(err.message),
        refetchInterval: 3000
    });
};
