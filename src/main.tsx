import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {KeepAwake} from "react-keep-awake";
import {ErrorBoundary} from "react-error-boundary";
import {Error} from "./Error";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.body as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary fallbackRender={({error}) => <Error error={error}/>}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <QueryClientProvider client={queryClient}>
                    <ModalsProvider>
                        <App/>
                    </ModalsProvider>
                </QueryClientProvider>
            </MantineProvider>
            <KeepAwake/>
        </ErrorBoundary>
    </React.StrictMode>,
)
