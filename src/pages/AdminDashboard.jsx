import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/css/DashAndHome.css"
export default function AdminDashboard() {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(true);
    const [user_cred, setuser_cred] = useState(null)
    const { fetchdata, cartToggled } = useAuth()
    var user_data = null;
    var admin = false;
    if (localStorage.getItem('admin')) {
        admin = localStorage.getItem('admin');
    }
    useEffect(() => {
        const fetchDatadash = async () => {
            try {
                user_data = await fetchdata("/user_data");
                console.log(user_data);
                setuser_cred(user_data);
                setisLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setisLoading(false);
            }
        };
        fetchDatadash()
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            {admin && <div className={`table ${cartToggled ? 'blur' : ''}`}>
                <h1>inside dashboard</h1>
                {isLoading ? (<p>loading</p>
                ) : <table >
                    <thead>
                        <tr>
                            <th>Users id</th>
                            <th>Users name</th>
                            <th>Users email</th>

                        </tr>
                    </thead >
                    <tbody>
                        {user_cred ? user_cred.map((user, index) => {
                            return (<tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>)
                        }) : <td>no data</td>}
                    </tbody>
                </table>}
            </div>}
            {!admin && <div>
                <p>You must be an admin to access this page</p>
            </div>}
        </div>
    )
}