import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/users/sign-up',
    data: {
      credentials: {
        name: credentials.name,
        phone: credentials.phone,
        address: credentials.address,
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
  
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/users/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}


export const categories = user => {
  return axios({
    method: 'get',
    url: apiUrl + '/users/categroies',
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    }
  })
  
}

export const categoriesPost = (user, name) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/users/categroies',
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
    data: {
      categroy: {
        name: name
      }
  }
})}

export const services = (user, id) => {
  return axios({
    method: 'get',
    url: `${apiUrl}/users/categroies/${id}/services/`,
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
  
})}


export const request = (cid, sid, request) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/customers/${cid}/${sid}/servex/`,
    data: request,
    
})}

export const addServices = (user, id, service) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/users/categroies/${id}/services`,
    data: {
      service: service
    },
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
  
})}

export const updateCategroy = (user, id, categroy) => {
  return axios({
    method: 'patch',
    url: `${apiUrl}/users/categroies/${id}`,
    data: {
      categroy: categroy
    },
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
  
})}

export const destroyCategroy = (user, id) => {
  return axios({
    method: 'delete',
    url: `${apiUrl}/users/categroies/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
  
})}


export const updateService = (user, cid, sid, service) => {
  return axios({
    method: 'patch',
    url: `${apiUrl}/users/categroies/${cid}/services/${sid}`,
    data: {
      service: service
    },
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
  
})}

export const destroyService = (user, cid, sid) => {
  return axios({
    method: 'delete',
    url: `${apiUrl}/users/categroies/${cid}/services/${sid}`,
    headers: {
      'Authorization': `Bearer ${user.token}` // FOR EXPRESS
      // 'Authorization': `Token token=${user.token}` // FOR RAILS
    },
  
})}
/// /users/categroies/:id/services

///users/categroies/:id/services