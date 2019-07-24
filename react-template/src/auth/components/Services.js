import React,{Component} from 'react'
import {services, addServices, destroyService} from '../api'
import { withRouter, Link } from 'react-router-dom'
class Services extends Component {
    state = {
        services: [],
        service: {
            name: '',
            description: ''
        }
    }
    componentDidMount = () => {
        const id = this.props.match.params.id
    
        services(this.props.user, id)
        .then(
            response => this.setState({
                services: response.data.services
            })
            
            
        )
        .catch(error => console.error(error))
    }
    handleChange = event => {
        const copyService = Object.assign(this.state.service);
        copyService[event.target.name] = event.target.value;
        this.setState({
            service: copyService
        })

    }
    onSubmit = event => {
        event.preventDefault()
        const id = this.props.match.params.id
        addServices(this.props.user, id, this.state.service)
        .then(service => {
        this.setState({
            service: {
                name: '',
                description: ''
            }
        })
        this.componentDidMount();
        })
        
        
    }
    destroy = sid => {
        console.log(sid)
        console.log(this.props.match.params.id)
        destroyService(this.props.user, this.props.match.params.id, sid)
        .then(
            deleteProcessing => this.componentDidMount()
        )
        .catch(error => console.error(error))
    }
    render(){
        const {name, description} = this.state.service
        return (
            <div>
                {this.state.services.map(service => 
                    <div key={service._id}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <Link to={`/dashboard/${this.props.match.params.id}/edit/services/${service._id}`} >
                            Edit
                        </Link>
                        &nbsp;
                        <Link to={`/dashboard/${this.props.match.params.id}`} onClick={() => this.destroy(service._id)}>
                        Destroy
                        </Link> 
                        <hr/>
                    </div>
                )}
                <details>
                        <summary>Add Service</summary>
                            <form onSubmit={this.onSubmit}>
                                <label htmlFor="name">Name</label>
                                <input
                                required
                                name="name"
                                value={name}
                                type="text"
                                onChange={this.handleChange}
                                />
                                <label htmlFor="description">Description</label>
                                <textarea rows="4" cols="50"
                                required
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                                />
                               
                                <input type="submit" value="Add Service" />
                            </form>
                        </details>
            </div>
        )
    }
}

export default withRouter(Services)