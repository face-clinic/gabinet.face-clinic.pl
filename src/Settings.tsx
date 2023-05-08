import React, {forwardRef, useState} from "react";
import {Alert, Button, Container, Divider, Group, LoadingOverlay, Select, Stack, Text, Title} from "@mantine/core";
import {useRooms} from "./hooks.";
import {getSpecializationColor} from "./specialization-color";

export interface UserSettings {
    hostname?: string;
}

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
                    itemComponent={SelectItem}
                    disabled={roomsQuery.isLoading}
                    data={roomsQuery.data.map(it => ({
                        value: it.hostname,
                        label: it.hostname,
                        description: `${it.doctor} - ${it.specialization}`,
                        color: getSpecializationColor(it.specialization)
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

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
    description: string;
    color: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({image, label, description, color, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <div style={{
                    backgroundColor: color,
                    display: 'block',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: '1px solid black'
                }}/>
                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" opacity={0.65}>
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
);
