import React, {Component} from 'react'
import {update, show} from '../api'
import { withRouter } from 'react-router-dom'

class EditService extends Component {

    state = {
        name: '',
        description: ''
    }

    componentDidMount = () => {
        show(this.props.user, this.props.match.params.cid, this.props.match.params.sid)
        .then(
            response => {
                console.log(response)
                this.setState({
                name: response.data.service[0].name,
                description: response.data.service[0].description
            })
        }
        )
        .catch(error => console.log(error))
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    handleSubmit = event => {
        event.preventDefault()

        update(this.props.user, this.props.match.params.cid, this.props.match.params.sid, this.state)
        .then(
            updated => {
                this.props.history.goBack();
            }
                        
        )
        .catch(error => console.error(error))
    }


    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name}  
                    onChange={this.handleChange}/>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={this.state.description} 
                    onChange={this.handleChange}/>
                    <input type="submit" value="update" />
                </form>
            </div>
        )
    }
}

export default withRouter(EditService)