import { IconSettings } from "@tabler/icons-react";
import React from "react";
import { modals } from "@mantine/modals";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';
import { Settings } from "./Settings";
import { UnstyledButton } from "@mantine/core";

const queryClient = new QueryClient();

export interface LocalStorageSettings {
    hostname: string;
}

export interface Room {
    hostname: string;
    employee: string;
}

function NobodyInTheRoom() {
    return (
        <p>nie ma nikogo</p>
    );
}

function App() {
    const [value, setValue] = useLocalStorage<LocalStorageSettings>({ key: 'settings' });
    const {
        data
    } = useQuery<Room[]>(["settings"], () => fetch("https://api.face-clinic.pl/rooms").then(response => response.json()), {
        enabled: !!value,
        refetchInterval: 10000,
        initialData: []
    });
    if (!value) return <Settings onSubmit={setValue}/>;

    const selectedRoom = data.find(it => it.hostname === value.hostname);
    if (!selectedRoom) return <NobodyInTheRoom/>;

    return (
        <div className="h-full static flex flex-col">
            <header className="p-8 bg-primary flex items-center">
                <h1 className="text-6xl text-museo flex-grow">
                    Stomatologia
                </h1>
                <UnstyledButton onClick={() => {
                    modals.open({
                        size: "lg",
                        fullScreen: true,
                        children: <Settings onSubmit={(value) => {
                            setValue(value);
                            modals.closeAll();
                        }}/>,
                    });
                }}>
                    <IconSettings size={48}/>
                </UnstyledButton>
            </header>
            <main className="flex-grow bg-black">
                <div className="h-full flex flex-row">
                    <p className="m-9 text-museo text-primary text-vertical text-6xl text-size-200 text-center">GABINET</p>
                    <p className="m-9 text-museo text-black flex-grow text-6xl text-size-vw text-center clock-background relative z-10">{selectedRoom.hostname.replaceAll(/[A-Z]+/gm, "")}</p>
                </div>
            </main>
            <footer className="p-8 bg-primary">
                <h1 className="pt-7 text-6xl text-museo">
                    Dr. {selectedRoom.employee}
                </h1>
            </footer>
        </div>
    )
}

export default App
