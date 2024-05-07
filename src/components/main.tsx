import { Header } from "./header";
import { Footer } from "./footer";
import { Layout } from "./layout";

const Main = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<Header />
				<Layout />
				<Footer />
			</div>
		</>
	);
};

export { Main };
