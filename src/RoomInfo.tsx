import {UnstyledButton} from "@mantine/core";
import {IconSettings} from "@tabler/icons-react";
import React, {useEffect} from "react";
import {Room} from "./Room";
import {getSpecializationColor} from "./specialization-color";

function renderRoomNumber(specialization: string, room: Room) {
    if (specialization === 'Gabinet higieny') return 'H';
    return room.hostname.split('-')[0].replaceAll(/[A-Z-]+/gm, "");
}

export function RoomInfo({handleSettings, room}: { handleSettings: () => void, room: Room }) {
    const color = getSpecializationColor(room.specialization);
    useEffect(() => {
        const element = document.querySelector(':root') as HTMLElement;
        element?.style.setProperty('--primary-color', color);
    }, [color])
    return (
        <div className="h-full static flex flex-col">
            <header className="p-8 bg-primary flex items-center">
                <h1 className="text-6xl text-museo flex-grow">
                    {room.specialization}
                </h1>
                <UnstyledButton onClick={handleSettings}>
                    <IconSettings size={48}/>
                </UnstyledButton>
            </header>
            <main className="flex-grow bg-black">
                <div className="h-full flex flex-row">
                    <p className="m-9 text-museo text-primary text-vertical text-6xl text-size-200 text-center">GABINET</p>
                    <p className="m-9 text-museo text-black flex-grow text-6xl text-size-vw text-center clock-background relative z-10">
                        {renderRoomNumber(room.specialization, room)}
                    </p>
                </div>
            </main>
            <footer className="p-8 bg-primary">
                <h1 className="pt-6 text-6xl text-museo">
                    Dr {room.doctor}
                </h1>
            </footer>
        </div>
    );
}

