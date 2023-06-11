import React, { useContext } from "react";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import ChooseSignUp from "./pages/chooseSignUp";
import SingUpAsociacion from "./pages/signUpAsociacion";
import SingUpUsuario from "./pages/signUpUsuario";
import ChooseLogin from "./pages/chooseLogin";
import LoginUsuario from "./pages/loginUsuario";
import LoginAsociacion from "./pages/loginAsociacion";
import Asociacion from "./pages/asociacion";
import Usuario from "./pages/usuario";
import AnimalForm from "./pages/animalForm";
import AnimalHomeDetail from "./pages/animalHomeDetail";
import AnimalDetail from "./pages/animalDetail";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const { store, actions } = useContext(Context);
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className={store.darkMode ? "dark-mode" : ""}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ChooseSignUp />} path="/choosesignup" />
                        <Route element={<ChooseLogin />} path="/chooselogin" />
                        <Route element={<SingUpUsuario />} path="/signup" />
                        <Route element={<SingUpAsociacion />} path="/signup2" />
                        <Route element={<LoginUsuario />} path="/loginUsuario" />
                        <Route element={<LoginAsociacion />} path="/loginAsociacion" />
                        <Route element={<Asociacion />} path="/asociacion" />
                        <Route element={<Usuario />} path="/usuario" />
                        <Route element={<AnimalForm />} path="/animalForm" h />
                        <Route element={<AnimalHomeDetail />} path="/animalHome:id" />
                        <Route element={<AnimalDetail />} path="/usuario/animal:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
