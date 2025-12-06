import axios from 'axios'
import global from '../global'

const { baseURL, headers } = global.api

const UserAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/users`,
    headers
})

const createUser = payload => UserAPI.post('', payload)

const deleteUser = uid => UserAPI.delete(`/${uid}`)

const updateUser = (uid, user) => UserAPI.put(`/${uid}`, user)

const getAllUserByRole = (role) => UserAPI.get('/role', { params: { role: role } })

const usrObj = {
    createUser,
    deleteUser,
    updateUser,
    getAllUserByRole
}

export default usrObj