import apiUrl from '../apiConfig'
import axios from 'axios'
export const index = user => {
    return axios({
      url: `${apiUrl}/users`,
      method: 'get',
      headers: 
      {
        'Authorization': `Bearer ${user.token}` 
      }
    })
}


export const show = (user, id) => {
    return axios({
      url: `${apiUrl}/users/${id}`,
      method: 'get',
      headers: 
      {
        'Authorization': `Bearer ${user.token}` 
      }
    })
}


export const showing = (user, uid, cid) => {
    return axios({
      url: `${apiUrl}/users/${uid}/categories/${cid}`,
      method: 'get',
      headers: 
      {
        'Authorization': `Bearer ${user.token}` 
      }
    })
}

export const indexing = (user, uid, cid, sid, request) => {
    return axios({
      method: 'post',
      url: `${apiUrl}/users/${uid}/categories/${cid}/services/${sid}`,
      data: {
        request
      },
      headers: 
      {
        'Authorization': `Bearer ${user.token}` 
      }
    })
}