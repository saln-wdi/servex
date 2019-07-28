import React, {Component} from 'react'
import {show} from '../api'
import { Link, withRouter } from 'react-router-dom'

class Categories extends Component {
    state = {
        categories:[]
    }
    componentDidMount = () => {
        show(this.props.user, this.props.match.params.id)
        .then(
            res => {
                 this.setState({
                    categories: res.data.categories 
                })
            }
            
        )
        .catch(error => console.error(error))
    }
    render() {
        return(
            <div>
                {this.state.categories.map(category => 
                    <Link to={`/users/${this.props.match.params.id}/categories/${category.id}`}
                     key={category.id}>
                        <h1>{category.category}</h1>
                    </Link> 
                   // console.log(user.user)  
                )}
            </div>
        )
    }
}

export default withRouter(Categories)