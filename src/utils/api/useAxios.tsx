import {useState, useCallback, useMemo} from 'react';
import {AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

const useAxios = () => {
    const [requestsCounter, setCounter] = useState(0);
    const [axiosNotification, setAxiosNotification] = useState<{type:'error' |'success', text:string} | null>(null);

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
            if((!axiosNotification || axiosNotification.type === "error")) {
                setAxiosNotification({type:'success', text: response?.data.message || "Operación realizada con éxito."});
            }
            return response
        },
        error: (axiosError : AxiosError) => {
            dec();
            if((!axiosNotification || axiosNotification.type === "success")){
                setAxiosNotification({type:'error', text: axiosError?.response?.data.message || "Se ha producido un error con el servidor."});
                setTimeout(() => {
                    setAxiosNotification(null);
                }, 1300);
            }
            return Promise.reject(axiosError)
        }
    }), [inc, dec, axiosNotification]);

    return {interceptors, axiosNotification, requestsCounter};
}

export default useAxios;