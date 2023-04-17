import { useQuery } from "@tanstack/react-query";
import { Room } from "./Room";
import { UseQueryOptions } from "@tanstack/react-query/src/types";

export function useRooms(options: UseQueryOptions<Room[]> = {}) {
    return useQuery<Room[]>(["rooms"], () => fetch("https://api.face-clinic.pl/rooms").then(response => response.json()), options);
}
