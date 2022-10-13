
import axios from 'axios';

const baseAPiUrl = process.env.REACT_APP_API_URL;

const appApi = axios.create({
    baseURL: baseAPiUrl,
    withCredentials: true,
    validateStatus: function (status) {
        return status === 200;
    }
});

export const appApiWithoutLoader = axios.create({
    baseURL: baseAPiUrl,
    withCredentials: true,
    validateStatus: function (status) {
        return status === 200;
    }
});

export default appApi;