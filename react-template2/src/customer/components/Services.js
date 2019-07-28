import React, {Component} from 'react'
import {showing} from '../api'
import { Link, withRouter } from 'react-router-dom'

class Services extends Component {
    state = {
        services:[]
    }
    componentDidMount = () => {
        showing(this.props.user, this.props.match.params.uid,  this.props.match.params.cid)
        .then(
            res => 
                 this.setState({
                    services: res.data.services 
                })
            
            
        )
        .catch(error => console.error(error))
    }

// description: "asdffdsadfas"
// id: "5d3c1fe8bedf863a3c4980a4"
// service: "HelloWorld"
    render() {
        return(
            <div>
                {this.state.services.map(service => 
                    <Link to={`/users/${this.props.match.params.uid}/categories/${this.props.match.params.cid}/services/${service.id}`}
                     key={service.id}>
                        <h1>{service.service}</h1>
                        <p>{service.description}</p>
                    </Link> 
                )}
            </div>
        )
    }
}

export default withRouter(Services)