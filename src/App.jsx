import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage.jsx";
import {ResultPage} from "./pages/ResultPage.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/result" element={<ResultPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App
