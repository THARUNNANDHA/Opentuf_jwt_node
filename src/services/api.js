import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://jwt-node-backend-production.up.railway.app'
    // baseURL: 'https://jwt-node-backend.onrender.com'
    // baseURL: 'http://localhost:5000'

});

api.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    if (config.accesstoken != null && !config.refreshToken) {
        // console.log(config.accesstoken)
        config.headers['Authorization'] = `Bearer ${config.accesstoken}`;
        return config;
    }
    return config;
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
export const change_password_otp = async (api_to_get, email) => {
    return await api.post(api_to_get, email);
}

// export const fetchdata = async (api_to_get, accessToken) => {
//     return await api.post(api_to_get, accessToken);
// }

export const fetchdata = async (api_to_get, config) => {
    return await api.get(api_to_get, config);
}
export const fetchdataProduct = async (api_to_get, config) => {
    return await api.get(api_to_get, config);
}
export const product_changes = async (api_to_get, config) => {
    return await api.post(api_to_get, config);
}
export const signup = async (api_to_get, config) => {
    return await api.post(api_to_get, config);
}
export default { signup, login, signin, refresh_token, logout, fetchdata, googlelogin, change_password_otp, fetchdataProduct, product_changes };
