// const getState = ({ getStore, getActions, setStore }) => {
// 	return {
// 		store: {
// 			message: null,
// 			demo: [
// 				{
// 					title: "FIRST",
// 					background: "white",
// 					initial: "white"
// 				},
// 				{
// 					title: "SECOND",
// 					background: "white",
// 					initial: "white"
// 				}
// 			]
// 		},
// 		actions: {
// 			// Use getActions to call a function within a fuction
// 			exampleFunction: () => {
// 				getActions().changeColor(0, "green");
// 			},

// 			getMessage: async () => {
// 				try{
// 					// fetching data from the backend
// 					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
// 					const data = await resp.json()
// 					setStore({ message: data.message })
// 					// don't forget to return something, that is how the async resolves
// 					return data;
// 				}catch(error){
// 					console.log("Error loading message from backend", error)
// 				}
// 			},
// 			changeColor: (index, color) => {
// 				//get the store
// 				const store = getStore();

// 				//we have to loop the entire demo array to look for the respective index
// 				//and change its color
// 				const demo = store.demo.map((elm, i) => {
// 					if (i === index) elm.background = color;
// 					return elm;
// 				});

// 				//reset the global store
// 				setStore({ demo: demo });
// 			}
// 		}
// 	};
// };

// export default getState;



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
			selectId:(animal) => {
				setStore({idAnimal: animal});
				console.log(getStore().idAnimal);
			},
			addFavorite:() => {
				
				const store = getStore();
				const newFavorite = store.idAnimal;
				setStore({favorites:[...store.favorites, newFavorite]});
				console.log(getStore().favorites);
			},
			removeFavorite: (fav) => {
				const store = getStore();
				const updatedArray = store.favorites.filter((favorite)=> favorite !== fav);
				setStore({favorites: updatedArray});

				console.log(getStore().favorites);

			}
		}
	};
};

export default getState;