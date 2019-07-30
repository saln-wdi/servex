import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'


class Dashboard extends Component {

    handleClick = event => {
        event.target.value.length ? this.props.history.push('/users') : this.props.history.push('/requests')
    }
    render () {
        return (
            <div>
                <button value="c" onClick={this.handleClick}>Company</button>
                <button onClick={this.handleClick}>Requests</button>
            </div>
        )
    }
}

export default withRouter(Dashboard)