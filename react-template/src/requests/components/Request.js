import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {show} from '../api'


class Request extends Component {
    state = {
        customers: []
    }
    componentDidMount = () => {
        show(this.props.user, this.props.match.params.id)
        .then(
            res => this.setState({customers: res.data.customers})
        )
        .catch(error => console.error(error))
    }
 
    render(){
        return (
            <div>
                {this.state.customers.map(customer => 
                    <div key={customer.id}>
                        {/* requests/:rid/owners/:oid */}
                        <Link to={`/requests/services/${this.props.match.params.id}/owners/${customer.id}`}>
                            {customer.customer}
                        </Link>
                        <hr/>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(Request)