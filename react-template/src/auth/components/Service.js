import React, {Component} from 'react'
import {updateService} from '../api'
import { withRouter } from 'react-router-dom'

class Service extends Component {

    state = {
        name: '',
        description: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    onSubmit = event => {
        event.preventDefault()

        updateService(this.props.user, this.props.match.params.cid, this.props.match.params.sid, this.state)
        .then(
            updateServiceDone => {
                this.props.history.goBack();
            }
                        
        )
        .catch(error => console.error(error))
    }


    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name}  onChange={this.handleChange}/>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={this.state.description}  onChange={this.handleChange}/>
                    <input type="submit" value="update" />
                </form>
            </div>
        )
    }
}

export default withRouter(Service)