import axios, { AxiosInstance } from "axios";

const useApi: AxiosInstance = axios.create({
	baseURL: "http://localhost:80",
	withCredentials: true,
	withXSRFToken: true,
});

export { useApi };
