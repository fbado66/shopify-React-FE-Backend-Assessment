import React, { Component} from 'react'
import {Form, Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

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
                <h2 className='formName '>{formName}</h2>
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
                        <label>Password</label>
                        <input  type='password'
                                autoComplete="off"
                                name ='password'
                                value={password}
                                onChange={this.handleChange} />
                    </Form.Field>
                    <Button color='green' id='buttonNewProduct'
                        type='submit'>Sign In</Button>
                </Form>

                <Button color='blue' as={Link} to={'/register'} id='registerBUtton'>
                        <Button.Content color ='blue' visible>Register</Button.Content>
                </Button>
            </div>
        )
    }
}

export default LogInForm