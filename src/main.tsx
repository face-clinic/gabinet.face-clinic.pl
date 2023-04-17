import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeepAwake } from "react-keep-awake";

ReactDOM.createRoot(document.body as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <QueryClientProvider client={new QueryClient()}>
                <ModalsProvider>
                    <App/>
                </ModalsProvider>
            </QueryClientProvider>
        </MantineProvider>
        <KeepAwake/>
    </React.StrictMode>,
)
