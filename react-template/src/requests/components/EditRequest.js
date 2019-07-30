import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {find, update} from '../api'


class EditRequest extends Component {
    state = {
        date: '',
        description: '',
        status: false,
        customer: '',
        address: ''
    }


    componentDidMount = () => {
        find(this.props.user, this.props.match.params.rid, this.props.match.params.oid)
        .then(
            res => { 
                const {customer, date, description, status} = res.data
                const address = customer.address
                this.setState({
                    date: date,
                    description: description,
                    status : status,
                    customer: customer,
                    address: address
                })
            }
        )
        .catch(error => console.error(error))
    }
    handleClick = event => {
        this.setState({
            status: event.target.checked
        })
    }
    handleSubmit = event => {
        event.preventDefault()
        update(this.props.user, this.props.match.params.sid, this.props.match.params.oid, this.props.match.params.rid, this.state.status)
        .then(
            res => 
            this.props.history.push(`/requests/services/${this.props.match.params.sid}/owners/${this.props.match.params.oid}`)
        )
        .catch(error => console.error(error))
    }
    render () {
        const customer = this.state.customer
        const address = this.state.address
        return (
            <div>
                <h4>{this.state.description}</h4>
                <p>{this.state.date}</p>
                <h5>Name: {customer.name}</h5>
                <h6>Phone: {customer.phone}</h6>
                <h6>Email: {customer.email}</h6>
                <label>Address</label>
                <p>City: {address.city}</p>
                <p>District: {address.district}</p>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    Completed: {React.createElement('input',{type: 'checkbox', checked: this.state.status, 
                    onChange: this.handleClick})}
                    <input type="submit" value="Update"/>
                </form>
            </div>
        )
    }
}

export default withRouter(EditRequest)