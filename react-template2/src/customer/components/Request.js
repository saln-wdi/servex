import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {indexing} from '../api'


class Request extends Component {
    state = 
    {
        date: ""
    }

    handleChange = event => this.setState({
        date: event.target.value
    })

    handleSubmit = event => {
        event.preventDefault()
        const {uid, cid, sid} = this.props.match.params
        indexing(this.props.user, uid, cid, sid, this.state)
        .then(
            res => {
                this.setState({
                    date: ""
                })
                this.props.history.goBack()
            }
        )
        .catch(error => console.log(error))

    }
    render() {
        return(
            <div>
               <form onSubmit={this.handleSubmit}>
                   <label htmlFor="date">Date</label>
                   <input type="date" 
                   value={this.state.date} onChange={this.handleChange}/>
                   <input type="submit" value="Request" />
               </form>
            </div>
        )
    }
}

export default withRouter(Request)