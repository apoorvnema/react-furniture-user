import ApiEndpoints from "./ApiEndpoints";
import ApiMethods from "./ApiMethods";

class ApiManager {
    static login = (body) => {
        const query = ApiEndpoints.login();
        return ApiMethods.postMethod(query, body);
    }
    static signup = (body) => {
        const query = ApiEndpoints.signup();
        return ApiMethods.postMethod(query, body);
    }
    static getProducts = () => {
        const query = ApiEndpoints.getProducts();
        return ApiMethods.getMethod(query);
    }
}

export default ApiManager;