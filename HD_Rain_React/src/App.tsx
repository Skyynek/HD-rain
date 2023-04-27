import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from 'react-auth-kit';

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Authentification from "./pages/Authentification";
import FormCreateAccount from "./composants/FormCreateAccount";
import FormConnection from "./composants/FormConnection";
import { RequireAuth } from 'react-auth-kit'
import { useSignIn } from 'react-auth-kit'

function App() {
    return (
        <Routes>
            <Route path={'/'} element={
                // <RequireAuth loginPath={'/authentification/connection'}>
                   <Home />
                // </RequireAuth>
            } />

            

            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route
                path="/authentification/"
                element={<Authentification />}
            >
                <Route
                    path="/authentification/creation"
                    element={<FormCreateAccount />}
                ></Route>
                <Route
                    path="/authentification/connection"
                    element={<FormConnection />}
                ></Route>
            </Route>
        </Routes>



    );
}

export default App;
