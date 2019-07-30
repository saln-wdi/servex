import apiUrl from '../apiConfig'
import axios from 'axios'

export const findAll = (user) => {
    return axios({
      url: `${apiUrl}/requests`,
      method: 'get',
      headers: 
      {
        'Authorization': `Bearer ${user.token}` 
      }
    })
}

export const find = (user, id) => {
    return axios({
      url: `${apiUrl}/requests/${id}`,
      method: 'get',
      headers: 
      {
        'Authorization': `Bearer ${user.token}` 
      }
    })
}