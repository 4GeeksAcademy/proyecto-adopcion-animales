import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Carousel } from "../component/carousel";
import InfoAdoption from "../component/infoAdoption";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<Carousel></Carousel>
			<InfoAdoption></InfoAdoption>
		</div>
	);
};
