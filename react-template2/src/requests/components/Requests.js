import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {findAll} from '../api'


class Requests extends Component {
    state = {
        services: []
    }
    componentDidMount = () => {
        findAll(this.props.user)
        .then(
            res => this.setState({
                services: res.data.services
            })
        )
        .catch( error => console.error(error))
    }
    render () {
        return (
            <div>
                {this.state.services.map(service => 
                    <Link to={`/requests/${service.id}`} key={service.id}>
                        <h1>{service.name}</h1>
                        <p>{service.description}</p>
                    </Link>
                    )}
            </div>
        )
    }
}

export default withRouter(Requests)