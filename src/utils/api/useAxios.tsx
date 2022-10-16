import {useState, useCallback, useMemo} from 'react';
import {AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

const useAxios = () => {
    const [requestsCounter, setCounter] = useState(0);    

    //Contadores para el loader
    const inc = useCallback(() => {
        setCounter(counter => counter + 1)
    }, [setCounter]);
    const dec = useCallback(() => setTimeout(()=>setCounter(counter => counter - 1),100), [setCounter]);

    //Interceptores de axios
    const interceptors = useMemo(() => ({
        request: (config : AxiosRequestConfig) => {
            inc(); 
            return config
        },
        response: (response : AxiosResponse) => {
            dec(); 
            return response
        },
        error: (axiosError : AxiosError) => {
            dec();
            return Promise.reject(axiosError)
        }
    }), [inc, dec]);

    return {interceptors, requestsCounter};
}

export default useAxios;