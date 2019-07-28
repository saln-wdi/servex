import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {update, show} from '../api'


class EditCategroy extends Component {
    state = 
    {
        category: 
        {
            name: ''
        }
    }

    componentDidMount = () => {
        show(this.props.user, this.props.match.params.id)
        .then(
            response => {
                const copyCategory = Object.assign(this.state.category)
                copyCategory.name = response.data.category[0].name
                this.setState({
                    category: copyCategory
                })
            }
        )
        .catch()
    }

    handleChange = event => {
        const copyCategory = Object.assign(this.state.category)
        copyCategory.name = event.target.value;
        this.setState({
            categroy: copyCategory
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        update(this.props.user, this.props.match.params.id, this.state.category)
        .then( updated => {
                this.setState({
                    category: {
                        name: ''
                    }
                })
                this.props.history.push('/dashboard')
            }
                

            )
        .catch(error => console.log(error))
    }
    render() {
        return(
            <div>
               <form onSubmit={this.handleSubmit}>
                   <label htmlFor="name">Name</label>
                   <input type="text" 
                   value={this.state.category.name} onChange={this.handleChange}/>
                   <input type="submit" value="update" />
               </form>
            </div>
        )
    }
}

export default withRouter(EditCategroy)