import apiUrl from '../apiConfig'
import axios from 'axios'


export const index = user => 
{
    return axios(
    {
      method: 'get',
      url: `${apiUrl}/users/requests/services`,
      headers: 
      {
        'Authorization': `Bearer ${user.token}`
      }
    })
}
 
export const show = (user, id) => 
{
    return axios(
    {
      method: 'get',
      url: `${apiUrl}/users/requests/services/${id}`,
      headers: 
      {
        'Authorization': `Bearer ${user.token}`
      }
    })
}

export const showing = (user, sid, cid) => {
  return axios({
    method: "get",
    url: `${apiUrl}/users/requests/services/${sid}/customers/${cid}`,
    headers: 
      {
        'Authorization': `Bearer ${user.token}`
      }
  })
}


export const update = (user, sid, cid, rid, status) => {
  return axios({
    method: "post",
    url: `${apiUrl}/users/requests/services/${sid}/customers/${cid}/${rid}`,
    headers: 
      {
        'Authorization': `Bearer ${user.token}`
      },
    data: 
      {
        status
      }
  })
}

export const find = (user, rid, cid) => {
  return axios({
    method: "get",
    url: `${apiUrl}/users/requests/${rid}/customers/${cid}`,
    headers: 
      {
        'Authorization': `Bearer ${user.token}`
      }
  })
}
