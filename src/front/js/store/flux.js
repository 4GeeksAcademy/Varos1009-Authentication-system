const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user: null

		},
		actions: {

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}

			},

			signupUser: async (email, password) => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(email, password)
					})
					const user = await resp.json()
					setStore({ user: user })
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},


			login: async (email, password) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(email, password)
					})
					const data = await resp.json()
					const token = data.access_token
					localStorage.setItem('token', token)
					setStore({ token: token })
				} catch (error) {
					console.log("Error loading message from backend", error)
				}

			}
		}
	};
};

export default getState;
