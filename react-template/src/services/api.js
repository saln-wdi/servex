import apiUrl from '../apiConfig'
import axios from 'axios'


export const index = (user, id) => 
{
    return axios(
    {
        method: 'get',
        url: `${apiUrl}/users/categories/${id}/services`,
        headers:
        {
            'Authorization': `Bearer ${user.token}`
        }
        
    })
}



export const show = (user, cid, sid) => 
{
    return axios(
    {
        method: 'get',
        url: `${apiUrl}/users/categories/${cid}/services/${sid}`,
        headers: 
        {
            'Authorization': `Bearer ${user.token}`
        }

    })
}
  
  
  
export const create = (user, id, service) => 
{
    return axios(
    {
        method: 'post',
        url: `${apiUrl}/users/categories/${id}/services`,
        data: 
        {
            service
        },
        headers: 
        {
            'Authorization': `Bearer ${user.token}`
        }

    })
}
  
  
  
  
export const update = (user, cid, sid, service) => 
{
    return axios(
    {
        method: 'put',
        url: `${apiUrl}/users/categories/${cid}/services/${sid}`,
        data: {
            service
        },
        headers: 
        {
            'Authorization': `Bearer ${user.token}`
        }

    })
}

export const destroy = (user, cid, sid) => 
{
    return axios(
    {
        method: 'delete',
        url: `${apiUrl}/users/categories/${cid}/services/${sid}`,
        headers: 
        {
            'Authorization': `Bearer ${user.token}`
        }

    })
}