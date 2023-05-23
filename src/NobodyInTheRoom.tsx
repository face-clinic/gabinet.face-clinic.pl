import { UnstyledButton } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Settings } from "./Settings";
import { IconSettings } from "@tabler/icons-react";
import React from "react";

export function NobodyInTheRoom({ setValue }: { setValue: (hostname: string) => void }) {
    return (
        <div className="h-full static flex flex-col">
            <header className="p-8 flex items-center">
                <h1 className="text-6xl text-museo flex-grow">
                    Pusty gabinet
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
            </main>
        </div>
    );
}
