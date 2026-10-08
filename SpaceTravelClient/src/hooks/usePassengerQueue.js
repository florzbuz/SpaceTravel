import { useQuery } from "@tanstack/react-query";
import { getQueue } from "../api/queue";

export const usePassengerQueue = () => {

    return useQuery({
        queryKey: ["queue"],
        queryFn: getQueue
    });
};
