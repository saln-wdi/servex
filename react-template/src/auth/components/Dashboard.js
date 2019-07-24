import React, {Component} from 'react'
import {categories, categoriesPost} from '../api'
import { Link } from 'react-router-dom'
class Dashboard extends Component {
    state = {
        categories: [],
        name: ''
        
    }

    componentDidMount = () => {
        categories(this.props.user)
        .then( response =>
            this.setState({
                categories: response.data.categroies
            })
        )
        .catch(error => console.error(error));
        
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
          })
    }
    onSubmit = event => {
        event.preventDefault()
        categoriesPost(this.props.user, this.state.name)
        .then(
            updateProcess => {
                this.setState({
                    name: ''
                })
                this.componentDidMount()
            }
        )
        .catch(error => console.error(error))
    }
    render() {
        return(
            <div>
                {this.state.categories.map(category =>
                <Link to={`/dashboard/${category._id}`} key={category._id}>
                <h1 key={category._id}>{category.name}
                </h1>
                </Link> 
                )}
                <details>
                <summary>Add Category</summary>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                        required
                        name="name"
                        value={this.state.name}
                        type="text"
                        placeholder="Plumer"
                        onChange={this.handleChange}
                        />
                        <input type="submit" value="Add" />
                    </form>
                </details>
            </div>
        )
    }
}

export default Dashboard;