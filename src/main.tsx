import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {Error} from "./Error";
import {UserSettingsProvider} from "@bgalek/react-contexts";
import {useWakeLock} from "react-screen-wake-lock";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary fallbackRender={({error}) => <Error error={error}/>}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <QueryClientProvider client={queryClient}>
                    <ModalsProvider>
                        <UserSettingsProvider
                            initialState={{hostname: null}}
                            settingsKey="settings"
                            version="1"
                        >
                            <App/>
                        </UserSettingsProvider>
                    </ModalsProvider>
                </QueryClientProvider>
            </MantineProvider>
        </ErrorBoundary>
        <KeepAwake/>
    </React.StrictMode>,
)

function KeepAwake() {
    const {released, request} = useWakeLock();
    useEffect(() => {
        if (released !== false) request();
    }, [released]);
    return null;
}
