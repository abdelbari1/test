import axios from 'axios'
import global from '../global'

const { baseURL, headers } = global.api

const LoginAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/login`,
    headers
})

const login = (email, password) => LoginAPI.get('', { auth: { username: email, password: password } })

const loginObj = {
    login
}

export default loginObj