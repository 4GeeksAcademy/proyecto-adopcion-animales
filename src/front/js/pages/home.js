import React, { useContext } from "react";
import "../../styles/home.css";

import "../../styles/home.css";
import { Carousel } from "../component/carousel";
import InfoAdoption from "../component/infoAdoption";
import { SearchBar } from "../component/searchBar";


export const Home = () => {

  return (
    <div className={"text-center"}>
      <Carousel />
      <SearchBar />
      <InfoAdoption />
    </div>
  );

};
