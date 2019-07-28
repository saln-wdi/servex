import React, {Component} from 'react'
import {index} from '../api'
import { Link, withRouter } from 'react-router-dom'

class Users extends Component {
    state = {
        users:[]
    }
    componentDidMount = () => {
        index(this.props.user)
        .then( 
            res => 
                 this.setState({
                    users: res.data.users
                })
            
        )
        .catch(error => console.error(error))
    }
    render() {
        return(
            <div>
                {this.state.users.map(user => 
                    <Link to={`/users/${user.id}`} key={user.id}>
                        <h1>{user.user}</h1>
                    </Link> 
                   // console.log(user.user)  
                )}
            </div>
        )
    }
}

export default withRouter(Users)