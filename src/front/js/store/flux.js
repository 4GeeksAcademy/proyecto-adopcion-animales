const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// otros estados...
			darkMode: false, // estado inicial del modo oscuro (false para modo claro)
			favorites: [],
			idAnimal: {}

		},
		actions: {

			toggleDarkMode: () => {
				const store = getStore();
				setStore({ darkMode: !store.darkMode });
			},
			selectId: (animal) => {
				setStore({ idAnimal: animal });
				console.log(getStore().idAnimal);
			},
			addFavorite: () => {


				const store = getStore();
				console.log(store.idAnimal.id);
				fetch(process.env.BACKEND_URL + "/api/user/favorites", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},

					body: JSON.stringify({
						"animal_id": store.idAnimal.id
					}),

				})
					.then((response) => response.json())
					.then((result) => {
						console.log(result);

					})
					.catch((error) => console.log("error", error));


				// ***HACER EL POST DE MANERA LOCAL	
				// const store = getStore();
				// const newFavorite = store.idAnimal;
				// setStore({favorites:[...store.favorites, newFavorite]});
				// console.log(getStore().favorites);
			},
			removeFavorite: (favoriteID) => {
				console.log('ID del favorito:', favoriteID);
				fetch(process.env.BACKEND_URL + "/api/user/favorites/" + favoriteID, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
					.then((response) => response.json())
					.then((result) => {
						console.log(result);

						// ***HACER EL DELETE DE MANERA LOCAL   
						const store = getStore();
						const updatedArray = store.favorites.filter((favorite) => favorite.id !== favoriteID);
						setStore({ favorites: updatedArray });
						console.log(getStore().favorites);
					})
					.catch((error) => console.log("error", error));
			},


			fetchUserFavorite: () => {
				fetch(process.env.BACKEND_URL + "/api/user/favorites", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
					.then((response) => response.json())
					.then((result) => {
						setStore({ favorites: result });
						console.log(result, 'GET del Flux');

					})
					.catch((error) => console.log("error", error));
			},


		},

	}
};


export default getState;