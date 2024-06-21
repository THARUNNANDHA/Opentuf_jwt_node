import "./assets/css/App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
