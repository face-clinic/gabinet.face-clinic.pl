import React, { useState } from "react";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "./Settings";
import { NobodyInTheRoom } from "./NobodyInTheRoom";
import { RoomInfo } from "./RoomInfo";
import { Room } from "./Room";

function App() {
    const [hostname, setHostname] = useState('');
    const roomsQuery = useQuery<Room[]>(["rooms"], () => fetch("https://api.face-clinic.pl/rooms").then(response => response.json()), {
        refetchInterval: 10000,
        enabled: !!hostname
    });

    if (!hostname) return (
        <Settings onSubmit={(value) => setHostname(value)}/>
    );

    if (roomsQuery.isLoading) return null;
    if (!roomsQuery.data) return <p>error</p>;


    const selectedRoom = roomsQuery.data.find(it => it.hostname === hostname);
    if (!selectedRoom) return <NobodyInTheRoom setValue={setHostname}/>;

    return (
        <RoomInfo handleSettings={() => {
            modals.open({
                size: "lg",
                fullScreen: true,
                children: (
                    <Settings onSubmit={(value) => {
                        setHostname(value);
                        modals.closeAll();
                    }}/>
                ),
            });
        }} room={selectedRoom}/>
    )
}

export default App
