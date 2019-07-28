import apiUrl from '../apiConfig'
import axios from 'axios'


export const index = user => 
{
    return axios(
    {
      method: 'get',
      url: `${apiUrl}/users/categories`,
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
        url: `${apiUrl}/users/categories/${id}`,
        headers: 
        {
        'Authorization': `Bearer ${user.token}`
        }
    })
}


export const create = (user, name) => 
{
    return axios(
    {
        method: 'post',
        url: `${apiUrl}/users/categories`,
        headers: 
        {
            'Authorization': `Bearer ${user.token}`
        },
        data: 
        {
            category:  
            {
                name
            }
        }
    })
}



export const update = (user, id, category) => 
{
    return axios(
    {
      method: 'put',
      url: `${apiUrl}/users/categories/${id}`,
      data: 
      {
        category
      },
      headers: 
      {
        'Authorization': `Bearer ${user.token}` 
      }
    
    })
}
  


export const destroy = (user, id) => 
{
    return axios(
    {
        method: 'delete',
        url: `${apiUrl}/users/categories/${id}`,
        headers: 
        {
        'Authorization': `Bearer ${user.token}`
        }
    })
}