import React, {useState} from "react";
import {Alert, Button, Container, Divider, LoadingOverlay, Select, Stack, Title} from "@mantine/core";
import {useRooms} from "./hooks.";

export function Settings({onSubmit}: { onSubmit: (hostname: string) => void }) {
    const [hostname, setHostname] = useState('');
    const roomsQuery = useRooms({
        onSuccess: (data) => {
            if (data.length > 0) setHostname(data[0].hostname)
        }
    });
    if (roomsQuery.isLoading) return <LoadingOverlay visible/>;
    if (roomsQuery.error || !roomsQuery.data) return (<Alert title="Bummer!" color="red">Error!</Alert>);
    return (
        <Container sx={(theme) => ({padding: theme.spacing.lg, height: '100%'})}>
            <Stack justify="space-between">
                <Title>Ustawienia</Title>
                <Select
                    description="Wybierz komputer"
                    maxDropdownHeight={500}
                    size="xl"
                    value={hostname}
                    onChange={value => {
                        if (value) setHostname(value);
                    }}
                    disabled={roomsQuery.isLoading}
                    data={roomsQuery.data.map(it => ({
                        value: it.hostname,
                        label: `${it.hostname} (${it.doctor} - ${it.specialization})`
                    }))}
                />
                <Button size="xl" variant="gradient" disabled={!hostname} onClick={() => onSubmit(hostname)}>
                    Zapisz
                </Button>
                <Divider/>
                <Button variant="outline" size="xl" onClick={() => window.location.reload()}>
                    Odśwież
                </Button>
            </Stack>
        </Container>
    );
}
