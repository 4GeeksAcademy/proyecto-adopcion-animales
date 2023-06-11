



const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// otros estados...
			darkMode: false // estado inicial del modo oscuro (false para modo claro)
		},
		actions: {

			toggleDarkMode: () => {
				const store = getStore();
				setStore({ darkMode: !store.darkMode });
			}
		}
	};
};

export default getState;