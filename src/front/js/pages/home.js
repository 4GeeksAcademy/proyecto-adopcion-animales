import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
// import SignUp from "./signUp";
// import Login from "./login";
// import AnimalForm from "./animalForm";

import "../../styles/home.css";
import { Carousel } from "../component/carousel";
import InfoAdoption from "../component/infoAdoption";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
        <Carousel />
        <InfoAdoption></InfoAdoption>
      {/* <AnimalForm /> */}
    </div>
  );

};
