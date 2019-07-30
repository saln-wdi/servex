import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
    handleClick = event => {
        const {history} =  this.props
        event.target.value.length ? history.push('/categroies') : history.push('/requests/services')
    }
    render(){
        return (
            <div>
                <button value="c" onClick={this.handleClick}>Categroies</button>
                <button onClick={this.handleClick}>Request</button>
            </div>
        )
    }
}

export default withRouter(Dashboard)