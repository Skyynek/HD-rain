import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";
import StationContextProvider from "./StationContext";
import UserContextProvider from "./UserContext";
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

    <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}>
        <BrowserRouter>

            <UserContextProvider>
                <StationContextProvider>
                    <React.StrictMode>

                        <ChakraProvider theme={theme}>
                            <App />
                        </ChakraProvider>

                    </React.StrictMode>
                </StationContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    </AuthProvider>
);
