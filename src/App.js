import Header from "./components/header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import ItemList from "./pages/ItemList/ItemList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Header />

				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/detail/:id" element={<ItemList />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
