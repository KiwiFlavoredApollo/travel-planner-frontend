import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HistoryPage} from "./pages/HistoryPage.jsx";
import {MainPage} from "./pages/MainPage.jsx";
import {TimelinePage} from "./pages/TimelinePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
            <Route path="/timeline" element={<TimelinePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;