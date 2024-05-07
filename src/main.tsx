import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import * as Components from "./components";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Components.Main />}
			errorElement={<Components.NoMatch />}
		></Route>
	)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
