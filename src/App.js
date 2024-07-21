import "./assets/css/App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from './context/authContext';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home";
import Forgotpassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgot_password" element={<Forgotpassword />}></Route>
            {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div >
  );
}

export default App;