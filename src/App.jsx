import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage.jsx";
import {ResultPage} from "./pages/ResultPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/result" element={<ResultPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
