import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage.jsx";
import {ResultPage} from "./pages/ResultPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/result" element={<ResultPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App
