import React, {Component} from 'react'
import {categories, categoriesPost, destroyCategroy} from '../api'
import { Link, withRouter } from 'react-router-dom'
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
    destroy = (id) => {
        destroyCategroy(this.props.user, id)
        .then(
            deleteDone => {
                console.log(deleteDone)
                this.componentDidMount();
            }
        )
        .catch(error => console.error(error))
    }
    render() {
        return(
            <div>
                {this.state.categories.map(category =>
                <div key={category._id}>
                <Link to={`/dashboard/${category._id}`}>
                <h1>{category.name}</h1>
                </Link>
                &nbsp; 
                <Link to={`/dashboard/edit/${category._id}`}>
                    Edit
                </Link>
                &nbsp; 
                <Link to={`/dashboard`} onClick={() => this.destroy(category._id)}>
                    Destroy
                </Link>  
                </div>
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

export default withRouter(Dashboard); 