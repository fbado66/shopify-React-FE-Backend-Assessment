import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react'


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
        <div>
            <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name'
                                autoComplete="off"
                                name ='first_name'
                                value={first_name}
                                onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name'
                                autoComplete="off"
                                name ='last_name'
                                value={last_name}
                                onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='name@gmail.com'
                                autoComplete="off"
                                name ='email'
                                value={email}
                                onChange={this.handleChange} />
                    </Form.Field>
          
                    <Form.Field>
                        <label>Phone Number</label>
                        <input placeholder='xxx xxx xxxx'
                                type='number'
                                autoComplete="off"
                                name ='phone'
                                value= {phone}
                                onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Home Address</label>
                        <input placeholder='123 Main st, New York, NY 11221'
                                type='text'
                                name ='address'
                                value= {address}
                                onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" autoComplete="off" 
                                name="password" 
                                value={password} 
                                onChange={this.handleChange}/>
                    </Form.Field>
                    <Button color='green' id='buttonNewProduct'
                    type='submit'>Register</Button>
            </Form>
      </div>
    );
  }

}

export default RegisterForm;