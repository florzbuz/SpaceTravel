import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import ErrorProvider from "./context/ErrorProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ErrorProvider>
                <App />
            </ErrorProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
