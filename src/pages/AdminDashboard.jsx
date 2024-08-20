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
            <div className="flex items-center justify-center w-full">
                {admin && <div className={`flex flex-col w-[75%]${cartToggled ? 'blur' : ''}`}>
                    <h1 className="text-center font-bold">User Data</h1>
                    {isLoading ? (<p>loading</p>
                    ) : <table >
                        <thead className="bg-cusgreen">
                            <tr>
                                <th className="text-white">Users id</th>
                                <th className="text-white">Users name</th>
                                <th className="text-white">Users email</th>

                            </tr>
                        </thead >
                        <tbody>
                            {user_cred ? user_cred.map((user, index) => {
                                return (<tr key={index} className="even:bg-gray-200">
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>)
                            }) : <td>no data</td>}
                        </tbody>
                    </table>}
                </div>}
            </div>
            {!admin && <div>
                <p>You must be an admin to access this page</p>
            </div>}
        </div>
    )
}