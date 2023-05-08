import React from "react";
import {modals} from "@mantine/modals";
import {Settings, UserSettings} from "./Settings";
import {NobodyInTheRoom} from "./NobodyInTheRoom";
import {RoomInfo} from "./RoomInfo";
import {useRooms} from "./hooks.";
import {useLocalUserSettings} from "@bgalek/react-contexts";

function App() {
    const {settings, setSettings} = useLocalUserSettings<UserSettings>();
    const roomsQuery = useRooms({
        refetchInterval: 10000,
        enabled: !!settings.hostname,
        retry: Infinity,
    });

    if (!settings.hostname) return (
        <Settings onSubmit={(value) => setSettings('hostname', value)}/>
    );

    if (roomsQuery.isLoading) return null;

    const selectedRoom = (roomsQuery.data || []).find(it => it.hostname === settings.hostname);
    if (!selectedRoom) return <NobodyInTheRoom setValue={(value) => setSettings('hostname', value)}/>;

    return (
        <RoomInfo handleSettings={() => {
            modals.open({
                size: "lg",
                fullScreen: true,
                children: (
                    <Settings onSubmit={(value) => {
                        setSettings('hostname', value);
                        modals.closeAll();
                    }}/>
                ),
            });
        }} room={selectedRoom}/>
    )
}

export default App
