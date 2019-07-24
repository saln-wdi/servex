import React,{Component} from 'react'
import {services, request} from '../api'
class Services extends Component {
    state = {
        services: [],
        formDate: {
            request: {
                date: ''
            },
            customer: {
                name: '',
                email: '',
                phone: '',
                address: {
                    city: '',
                    district: ''
                }
            }
        }
    }
    componentDidMount = () => {
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        services(this.props.user, id)
        .then(
            response => this.setState({
                services: response.data.services
            })
            
            
        )
        .catch(error => console.error(error))
    }
    handleChange = event => {
        const copyFormDate = Object.assign(this.state.formDate);
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'date'){
            copyFormDate.request.date = value
            this.setState({
                formDate: copyFormDate
            })
        }
        else if(name.includes('address')){
            copyFormDate.customer["address"][name.substring(8)] = value;
            this.setState({
                formDate: copyFormDate
            })
        }
        else {
            copyFormDate.customer[name] = value
            this.setState({
                formDate: copyFormDate
            })
        }

    }
    onSubmit = (event, sid) => {
        const cid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        event.preventDefault()
        request(cid, sid, this.state.formDate)
        .then(
            response => {
                console.log(response)
                this.setState({
                    services: [],
                    formDate: {
                        request: {
                            date: ''
                        },
                        customer: {
                            name: '',
                            email: '',
                            phone: '',
                            address: {
                                city: '',
                                district: ''
                            }
                        }
                    }
                })
                this.componentDidMount()
            }
        )
        .catch(error => console.error(error))
        
    }
    render(){
        const formDate = this.state.formDate;
        const {request, customer} = formDate;
        const {date} = request.date
        const {name, email, phone, address} = customer
        const {city, district} = address
        return (
            <div>
                {this.state.services.map(service => 
                    <div key={service._id}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <details>
                            <summary>Request</summary>
                            <form onSubmit={event => this.onSubmit(event, service._id)}>
                                <label htmlFor="name">Name</label>
                                <input
                                required
                                name="name"
                                value={name}
                                type="text"
                                onChange={this.handleChange}
                                />
                                <label htmlFor="email">Email</label>
                                <input
                                required
                                name="email"
                                value={email}
                                type="email"
                                onChange={this.handleChange}
                                />
                                <label htmlFor="date">Date</label>
                                <input
                                required
                                name="date"
                                value={date}
                                type="date"
                                onChange={this.handleChange}
                                />
                                <label htmlFor="phone">Phone</label>
                                <input
                                required
                                name="phone"
                                value={phone}
                                type="text"
                                onChange={this.handleChange}
                                />
                                <label htmlFor="address">Address</label>
                                <label>City</label>
                                <input
                                required
                                name="address city"
                                value={city}
                                type="text"
                                onChange={this.handleChange}
                                />
                                 <label>District</label>
                                <input
                                required
                                name="address district"
                                value={district}
                                type="text"
                                onChange={this.handleChange}
                                />
                                <input type="submit" value="Request" />
                            </form>
                        </details>
                        <hr/>
                    </div>
                )}
            </div>
        )
    }
}

export default Services