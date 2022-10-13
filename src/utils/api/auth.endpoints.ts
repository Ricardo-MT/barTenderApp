import appApi, { appApiWithoutLoader } from './config';
import axios from 'axios';
//Checkear si el usuario está logueado.
export const checkAuth = () => appApiWithoutLoader.get('/authentication');

//Logotu
export const logout = () => appApi.delete('/authentication');
//Crear llamada login
export const login = (credentials: { email: string; password: string }) => appApi.post('/authentication', credentials);