import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {find} from '../api'
import './Request.css'

class Request extends Component {
    state = {
        requests: [],
        com: ''
    }
    componentDidMount = () => {
        find(this.props.user, this.props.match.params.id)
        .then(
            res => {
                const notComplete = res.data.requests.filter(request => !request.status)
                const complete = res.data.requests.filter(request => request.status)
                this.setState({
                    requests: notComplete.concat(complete)
            })}
        )
        .catch( error => console.error(error))
    }
    changeCom = boolean => {
        boolean ? this.state.com = 'com' : this.state.com = ""
    }
    render () {
        return (
            <div>
                {this.state.requests.map(request => 
                <div key={request.id}>
                    {request.status ? this.changeCom(true) : this.changeCom(false)}
                    <div  className={this.state.com}>
                        <h4>{request.description}</h4>
                        <h5>{request.date}</h5>
                        <hr/>
                </div>
            </div>
                    )}
            </div>
        )
    }
}

export default withRouter(Request)