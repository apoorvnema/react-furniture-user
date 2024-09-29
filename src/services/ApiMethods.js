import axios from "axios"
import Headers from "./Headers";

class ApiMethods {
    static getMethod = async (url) => {
        try {
            const response = await axios.get(url, Headers && { headers: Headers() })
            return response.data
        } catch (error) {
            throw error?.response?.data?.error?.message;
        }
    }

    static postMethod = async (url, data) => {
        try {
            const response = await axios.post(url, data, Headers && { headers: Headers() })
            return response.data
        } catch (error) {
            throw error?.response?.data?.error?.message;
        }
    }

    static putMethod = async (url, data) => {
        try {
            const response = await axios.put(url, data, Headers && { headers: Headers() })
            return response.data
        } catch (error) {
            throw error?.response?.data?.error?.message;
        }
    }

    static deleteMethod = async (url) => {
        try {
            const response = await axios.delete(url, Headers && { headers: Headers() })
            return response.data
        } catch (error) {
            throw error?.response?.data?.error?.message;
        }
    }

    static patchMethod = async (url, data) => {
        try {
            const response = await axios.patch(url, data, Headers && { headers: Headers() })
            return response.data
        } catch (error) {
            throw error?.response?.data?.error?.message;
        }
    }
}

export default ApiMethods;