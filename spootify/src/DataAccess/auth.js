import api from '../config'

const { authUrl, clientId, clientSecret } = api;
const headersAuth = {
    'Authorization': 'Basic ' + window.btoa(clientId + ':' + clientSecret),
    'Content-Type': 'application/x-www-form-urlencoded'
}

const GetToken = async () => {
    const result  = await fetch(authUrl, {
        method: 'POST',
        headers: headersAuth,
        body: 'grant_type=client_credentials'
    })
    const data = await result.json();
    localStorage.setItem('token', data.access_token)
}

export default GetToken