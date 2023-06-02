import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
// import SignUp from "./signUp";
// import Login from "./login";
// import AnimalForm from "./animalForm";

import "../../styles/home.css";
import { Carousel } from "../component/carousel";
import InfoAdoption from "../component/infoAdoption";
import { SearchBar } from "../component/searchBar";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
        <Carousel />
        <SearchBar />
        <InfoAdoption></InfoAdoption>
      {/* <AnimalForm /> */}
    </div>
  );

};
