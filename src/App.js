import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TranslationPage from './Components/Views/TranslationPage';
import NotFound from "./Components/Views/NotFound";
import StartupPage from "./Components/Views/StartupPage";
import TranslationPage from "./Components/Views/TranslationPage";
import ProfilePage from "./Components/Views/ProfilePage";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<StartupPage />} />
					<Route path="/translation" element={<TranslationPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path='*' element={<NotFound/>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
