import React, {Component} from 'react'
import {updateCategroy} from '../api'
import { withRouter } from 'react-router-dom'

class Categroy extends Component {
    state = {
        categroy: {
            name: ''
        }
    }

    onSubmit = event => {
        event.preventDefault()
        const id = this.props.match.params.id
        updateCategroy(this.props.user, id, this.state.categroy)
        .then( updateProcessing => 
                this.setState({
                    categroy: {
                        name: ''
                    }
                }),
                this.props.history.push('/dashboard')

            )
        .catch(error => console.log(error))
    }
    onChange = event => {
        const copyCategroy = Object.assign(this.state.categroy)
        copyCategroy[event.target.name] = event.target.value;
        this.setState({
            categroy: copyCategroy
        })
    }
    render() {
        return(
            <div>
               <form onSubmit={this.onSubmit}>
                   <label htmlFor="name">Name</label>
                   <input type="text" name="name" 
                   value={this.state.categroy.name} onChange={this.onChange}/>
                   <input type="submit" value="update" />
               </form>
            </div>
        )
    }
}

export default withRouter(Categroy)