import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/css/DashAndHome.css"
export default function Dashboard() {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(true);
    const [user_cred, setuser_cred] = useState(null)
    const { fetchdata } = useAuth()
    var user_data = null;
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
            <div className="table">
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
            </div>
        </div>
    )
}