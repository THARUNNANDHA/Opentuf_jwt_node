import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const login = async (credentials) => {
    return await api.post('/login', credentials);
};

export const logout = async () => {
    return await api.post('/logout');
}

export const refresh_token = async (token) => {
    return await api.post('/refresh_access_token', token);
};
export const signin = async (credentials) => {
    return await api.post('/signin', credentials);
}
export const googlelogin = async (respons) => {
    return await api.post('/googlelogin', { "respons": respons });
}


// export const fetchdata = async (api_to_get, accessToken) => {
//     return await api.post(api_to_get, accessToken);
// }

export const fetchdata = async (api_to_get, accessToken) => {
    return await api.get(api_to_get, accessToken);
}
export default { login, signin, refresh_token, logout, fetchdata, googlelogin };