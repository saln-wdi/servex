import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {index} from '../api'


class Requests extends Component {
    state = {
        requests: []
    }
    componentDidMount = () => {
        index(this.props.user)
        .then(
            res => this.setState({requests: res.data.services})
        )
        .catch(error => console.error(error))
    }
 
    render(){
        return (
            <div>
                {this.state.requests.map(request => 
                    <div key={request.id}>
                        <Link to={`/requests/services/${request.id}`}>{request.service}</Link>
                        <hr/>
                    </div>
                    
                )}
            </div>
        )
    }
}

export default withRouter(Requests)