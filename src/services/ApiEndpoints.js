const authUrl = import.meta.env.VITE_FIREBASE_AUTH_URL;
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const dbUrl = import.meta.env.VITE_FIREBASE_DB_URL;


const ApiEndpoints = {
    login: ()=>(`${authUrl}/accounts:signInWithPassword?key=${apiKey}`),
    signup: ()=>(`${authUrl}/accounts:signUp?key=${apiKey}`),
    getProducts: ()=>(`${dbUrl}/products.json`),
    updateProductQuantity: (id)=>(`${dbUrl}/products/${id}.json`),
    placeOrder: ()=>(`${dbUrl}/orders.json`),
    getOrders: ()=>(`${dbUrl}/orders.json`)
}

export default ApiEndpoints;