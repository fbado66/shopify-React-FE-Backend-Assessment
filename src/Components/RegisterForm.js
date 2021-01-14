import React, { Component } from 'react';


class RegisterForm extends Component {

  state = {
    first_name: "",
    last_name: '',
    password: "",
    email: "",
    phone: "",
    address: "",
    capital: 0
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleRegisterSubmit(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {formName} = this.props
    let {first_name, last_name, password, email, phone, address, capital} = this.state

    return (      
        <form onSubmit={this.handleSubmit}>
        <h1>{formName}</h1>
        <label htmlFor="first_name">First Name:</label>
            <input type="text" autoComplete="off" 
                name="first_name" 
                value={first_name} 
                onChange={this.handleChange}
            />
        <label htmlFor="last_name">Last Name:</label>
            <input type="text" autoComplete="off" 
                name="last_name" 
                value={last_name} 
                onChange={this.handleChange}
            />
        <label htmlFor="email">Email:</label>
            <input type="text" autoComplete="off" 
                name="email" 
                value={email} 
                onChange={this.handleChange}
            />
        <label htmlFor="address">Address:</label>
            <input type="text" autoComplete="off" 
                name="address" 
                value={address} 
                onChange={this.handleChange}
            />
        <label htmlFor="phone">Phone:</label>
            <input type="number" autoComplete="off" 
                name="phone" 
                value={phone} 
                onChange={this.handleChange}
            />
        <label htmlFor="capital">Capital:</label>
            <input type="text" autoComplete="off" 
                name="capital" 
                value={capital} 
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
    );
  }

}

export default RegisterForm;