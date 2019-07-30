import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {index, create, destroy} from '../api'
class Categroies extends Component 
{
    state = 
    {
        categories: [],
        formData:
        {
            name: ''
        }
        
    }

    componentDidMount = () => 
    {
        index(this.props.user)
        .then( response =>
            this.setState({
                categories: response.data.categories
            })
        )
        .catch(error => console.error(error))
        
    }

    handleChange = event => 
    {
        const copyFormData = Object.assign(this.state.formData)
        copyFormData[event.target.name] =  event.target.value
        this.setState({
            formData: copyFormData
        })
    }

    handleSubmit = event => 
    {
        event.preventDefault()
        create(this.props.user, this.state.formData.name)
        .then(
            created => {
                this.setState({
                    formData: {
                        name: ''
                    }
                })
                this.componentDidMount()
            }
            
        )
        .catch(error => console.error(error))
    }

    destroy = (id) => 
    {
        destroy(this.props.user, id)
        .then(
            deleted => {
                this.componentDidMount()
            }
        )
        .catch(error => console.error(error))
        
    }

    render() 
    {
        return(
            <div>
                {this.state.categories.map(category =>
                    <div key={category._id}>
                    <Link to={`/categroies/${category._id}`}>
                    <h1>{category.name}</h1>
                    </Link>
                    &nbsp; 
                    <Link to={`/categroies/edit/${category._id}`}>
                        Edit
                    </Link>
                    &nbsp; 
                    <Link to={`/categroies`} onClick={() => this.destroy(category._id)}>
                        Destroy
                    </Link>  
                    </div>
                )}
                <details>
                    <summary>Add Category</summary>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                        required
                        name="name"
                        value={this.state.formData.name}
                        type="text"
                        placeholder="Plumer"
                        onChange={this.handleChange}
                        />
                        &nbsp;
                        <input type="submit" value="Add" />
                    </form>
                </details>
            </div>
        )
    }
}

export default withRouter(Categroies); 