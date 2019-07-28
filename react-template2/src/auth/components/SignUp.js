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
      password_confirmation: ''
    }
  }

  handleChange = event => {
    if(event.target.name.includes('ad')){
      const copyAddress = Object.assign(this.state.address)
      copyAddress[event.target.name.substring(3)] = event.target.value
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
      .then(res => setUser(res.data.customer))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/users'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, name, phone, password, password_confirmation } = this.state
    const {city, district} = this.state.address
    return (
      <form className='auth-form' onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>
        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={name}
          type="text"
          placeholder="Ali"
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
        <label htmlFor="city">City</label>
        <input
          required
          name="ad city"
          value={city}
          type="text"
          placeholder="Jeddah"
          onChange={this.handleChange}
        />
        <label htmlFor="district">District</label>
        <input
          required
          name="ad district"
          value={district}
          type="text"
          placeholder="alnkahe"
          onChange={this.handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input
          required
          name="password_confirmation"
          value={password_confirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
