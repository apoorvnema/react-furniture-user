
const Headers = () => {
    let token = localStorage.getItem('token');

    return {
        Authorization: token
    }
}

export default Headers;