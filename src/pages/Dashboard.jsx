import { useEffect } from "react";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Dashboard() {
    const navigate = useNavigate()

    const { logout, fetchdata, accesstoken } = useAuth()
    var user_data;
    useEffect(() => {
        const fetchDatadash = async () => {
            try {
                user_data = await fetchdata("/user_data", { "accesstoken": accesstoken });
                console.log(user_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // setTimeout(fetchDatadash, 1000);
        fetchDatadash()
    }, []);

    const displaydata = () => {

    }
    const Logout = async () => {
        const res = await logout();
        console.log(res);
        if (res) {
            navigate('/')
        }
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <h1>inside dashboard</h1>
                <button onClick={Logout}>logout</button>
            </div>
        </div>
    )
}