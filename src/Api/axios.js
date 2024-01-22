import axios from "axios";
import { baseUrl } from './app.config';


export let api = axios.create({
    baseURL: baseUrl,
    timeout: 100000,
 })





 