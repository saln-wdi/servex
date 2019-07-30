import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Dashboard from './dashboard/components/Dashboard'
import Categroies from './categroies/components/Categroies'
import EditCategroy from './categroies/components/EditCategroy'
import Alert from 'react-bootstrap/Alert'
import Services from './services/components/Services'
import EditService from './services/components/EditService'
import Requests from './requests/components/Requests'
import Request from './requests/components/Request'
import Owners from './requests/components/Owners'
import EditRequest from './requests/components/EditRequest'


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
          <AuthenticatedRoute user={user} exact path='/dashboard' render={() => (
            <Dashboard  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/categroies' render={() => (
            <Categroies  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/categroies/:id' render={() => (
            <Services  user={user} />
          )} />
           <AuthenticatedRoute user={user} exact path='/categroies/edit/:id' render={() => (
            <EditCategroy  user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/categroies/:cid/edit/services/:sid' render={() => (
            <EditService  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/requests/services' render={() => (
            <Requests  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/requests/services/:id' render={() => (
            <Request  user={user} />
          )} />
          {/* /requests/services/${request.id} */}
          <AuthenticatedRoute user={user} exact path='/requests/services/:sid/owners/:oid' render={() => (
            <Owners  user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/requests/services/:sid/owners/:oid/:rid' render={() => (
            <EditRequest  user={user} />
          )} />
        </main>
        
      </React.Fragment>
    )
  }
}

export default App
