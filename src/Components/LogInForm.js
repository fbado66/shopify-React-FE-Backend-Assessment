import React, { Component} from 'react'

class LogInForm extends Component {

    state = {
        first_name: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({ [name]: value})
    }

    render() {
        let {formName} = this.props
        let {first_name, password} = this.state



        return (
            <div>
                
                <form onSubmit={this.handleSubmit}>
                <h2>{formName}</h2>
                    <h1>{formName}</h1>
                    <label htmlFor="first_name">First Name:</label>
                        <input type="text" autoComplete="off" 
                        name="first_name" 
                        value={first_name} 
                        onChange={this.handleChange}
                        />
                    <label htmlFor="password">Password:</label>
                        <input type="password" autoComplete="off" 
                        name="password" 
                        value={password} 
                        onChange={this.handleChange}
                        />
                        <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default LogInForm