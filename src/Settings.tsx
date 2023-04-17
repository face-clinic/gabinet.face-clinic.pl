import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Select, Stack, Title } from "@mantine/core";
import { LocalStorageSettings, Room } from "./App";

export function Settings({ onSubmit }: { onSubmit: (hostname: LocalStorageSettings) => void }) {
    const [hostname, setHostname] = useState('');
    const {
        data,
        isLoading,
        isError
    } = useQuery<Room[]>(["settings"], () => fetch("https://api.face-clinic.pl/rooms").then(response => response.json()));
    if (isError) return <p>error</p>;
    return (
        <Container sx={(theme) => ({ padding: theme.spacing.lg, height: '100%' })}>
            <Stack justify="space-between">
                <Title>Ustawienia</Title>
                <Select
                    size="xl"
                    value={hostname}
                    onChange={value => {
                        if (value) setHostname(value);
                    }}
                    disabled={isLoading}
                    data={(data || []).map(it => it.hostname)}
                    label="Wybierz gabinet"
                />
                <Button size="xl" disabled={isLoading} onClick={() => onSubmit({ hostname: hostname })}>
                    Zapisz
                </Button>
            </Stack>
        </Container>
    );
}
