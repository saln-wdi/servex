import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {showing} from '../api'
import './Owners.css'


class Owners extends Component {
    state = {
        requests: [],
        com: "com"
    }
    componentDidMount = () => {
        showing(this.props.user, this.props.match.params.sid, this.props.match.params.oid)
        .then(
            res => {
                const completed = res.data.requests.filter(request => request.status)
                const notCompleted = res.data.requests.filter(request => !request.status)
                this.setState({requests: notCompleted.concat(completed)})
            }
        )
        .catch(error => console.error(error))
    }
    

    render(){
        return (
            <div>
                {this.state.requests.map(request =>
                    <div key={request.id}>
                        {request.status ? this.state.com = "com" : this.state.com = ""}
                        <Link  className={this.state.com}  to={`/requests/services/${this.props.match.params.sid}/owners/${this.props.match.params.oid}/${request.id}`}>
                        <h3>{request.description}</h3>
                        <p>{request.date}</p>
                        </Link>
                        <hr/>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(Owners)