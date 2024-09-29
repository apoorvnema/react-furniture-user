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
    static updateProductQuantity = (body, id) => {
        const query = ApiEndpoints.updateProductQuantity(id);
        return ApiMethods.patchMethod(query, body);
    }
    static placeOrder = (body) => {
        const query = ApiEndpoints.placeOrder();
        return ApiMethods.postMethod(query, body);
    }
    static getOrders = () => {
        const query = ApiEndpoints.getOrders();
        return ApiMethods.getMethod(query);
    }
}

export default ApiManager;