import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      phone: '',
      address: {
        city: '',
        district: ''
      },
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => {
    if(event.target.name.includes('address')){
      const copyAddress = Object.assign(this.state.address)
      const name = event.target.name.substring(8);
      copyAddress[name] =  event.target.value
      this.setState({
        address: copyAddress
      })
  }
    else
    this.setState({
    [event.target.name]: event.target.value
  })
}

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props
    
    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        console.error(error)
        this.setState({ 
          email: '', 
          password: '', 
          passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { name, phone, address, email, password, passwordConfirmation } = this.state

    return (
      <form className='auth-form' onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>

        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={name}
          type="text"
          placeholder="Nsma"
          onChange={this.handleChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          required
          name="phone"
          value={phone}
          type="text"
          placeholder="05xxxxxxxx"
          onChange={this.handleChange}
        />
        <label htmlFor="address">Address</label>
        <label>City</label>
        <input
          required
          name="address city"
          value={address.city}
          type="text"
          placeholder="Jeddah"
          onChange={this.handleChange}
        />
         <label>district</label>
        <input
          required
          name="address district"
          value={address.district}
          type="text"
          placeholder="Alrawda"
          onChange={this.handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="example@example.example"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="xxxxxx"
          onChange={this.handleChange}
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="xxxxxx"
          onChange={this.handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
