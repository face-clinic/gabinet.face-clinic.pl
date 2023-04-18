import React from "react";
import {Alert, Button, Container, Stack, Title} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";

export function Error({error}: { error: Error }) {
    return (
        <Container sx={(theme) => ({padding: theme.spacing.lg, height: '100%'})}>
            <Stack>
                <Title>Błąd aplikacji!</Title>
                <Alert icon={<IconAlertCircle size="1rem"/>} color="red">
                    {error.message}
                </Alert>
                <Button fullWidth variant="outline" size="xl" onClick={() => window.location.reload()}>
                    Odśwież
                </Button>
            </Stack>
        </Container>
    );
}
