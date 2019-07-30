import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Users from './customer/components/Users'
import Categories from './customer/components/Categories'
import Services from './customer/components/Services'
import Request from './customer/components/Request'
import Alert from 'react-bootstrap/Alert'
import Dashboard from './Dashboard'
import Requests from './requests/components/Requests'
import Request_ from './requests/components/Request' 

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state
    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact  path='/dashboard' render={() => (
            <Dashboard  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact  path='/users' render={() => (
            <Users  user={user} />
            
          )} />
          <AuthenticatedRoute user={user} exact  path='/users/:id' render={() => (
            <Categories  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact  path='/users/:uid/categories/:cid' render={() => (
            <Services  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact  path='/users/:uid/categories/:cid/services/:sid' render={() => (
            <Request  user={user} />
            
          )} />
          <AuthenticatedRoute user={user} exact path='/requests' render={() => (
            <Requests  user={user} />
            
          )} />
          <AuthenticatedRoute user={user} exact path='/requests/:id' render={() => (
            <Request_  user={user} />
            
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
