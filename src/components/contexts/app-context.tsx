import React, { createContext, useReducer } from "react";

const initialState = {
	files: [],
	loading: false,
	error: null,
};

const AppContext = createContext(initialState);

const appReducer = (state, action) => {
	switch (action.type) {
		case "ADD_FILE":
			return {
				...state,
				files: [...state.files, action.payload],
				loading: false,
			};
		case "SET_FILES":
			return { ...state, files: action.payload, loading: false };
		case "SET_LOADING":
			return { ...state, loading: true };
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
