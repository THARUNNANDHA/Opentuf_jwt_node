import "./assets/css/App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from './context/authContext';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard"
import Home from "./pages/Home";
import Forgotpassword from "./pages/ForgotPassword";
import Products_display from "./pages/Products_display";
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={
              <PrivateRoute roles={['admin', 'user']} ><Home /></PrivateRoute>}
            />
            <Route path="/adminDashboard" element={
              <PrivateRoute roles={['admin']} ><AdminDashboard /></PrivateRoute>}
            />
            {/* <Route path="/adminDashboard" element={<AdminDashboard />}></Route> */}
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/product" element={<Products_display />}></Route>
            <Route path="/forgot_password" element={<Forgotpassword />}></Route>
            {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div >
  );
}

export default App;