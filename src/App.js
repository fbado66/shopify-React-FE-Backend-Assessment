import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'

import Products from './Components/Products'
import LogInForm from './Components/LogInForm'
import './App.css';

class App extends React.Component {

  state = {
    products: [],
    user_id: '',
    first_name: '',
    token: ''

  }


  componentDidMount = () => {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(productsArray => {
      this.setState({ products: productsArray })
    })

    if(localStorage.token){
      fetch('http://localhost:3000/users/keep_logged_in', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then(res => res.json())
      .then(this.helpHandleLogInResponse)
    }
  }


  // LOGIN HANDLER 
  handleLoginSubmission = (userInfo) => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        first_name: userInfo.first_name,
        password: userInfo.password
      })
    })
    .then(res => res.json())
    .then(this.helpHandleLogInResponse)
  }

  // LOGOUT HANDLER 
handleLogOut = () => {
  this.setState({
    id: 0,
    first_name: ''
  })
  localStorage.clear()
}

// HELPER LOGIN FUNCTION
helpHandleLogInResponse = (res) => {
  if(res.error) {
    console.error(res.error)
  } else {
    localStorage.token = res.token
    this.setState({
      user_id: res.user.id,
      first_name: res.user.first_name,
      token: res.token
    })
  }
}

  // LOGIN / REGISTER FORM ------------------
  renderForm = (routerProps) => {
    if(this.state.token){
      return <button onClick={this.handleLogOut}>
      LOG OUT -> {this.state.first_name}?
    </button>
    }
    if(routerProps.location.pathname === "/login"){
      return <LogInForm
              formName="Login Form"
              handleSubmit={this.handleLoginSubmission}
            />
      
    }
    //  else if (routerProps.location.pathname === "/register") {
    //   return <RegisterForm
    //           formName="Register Form"
    //           handleRegisterSubmit={this.handleRegisterSubmit}
    //         />
    // } 
  }











  render() {


    return (
      <div>
        <h1>Shopify Front End </h1>
        <Products
        products = {this.state.products}
        />
        <main>
          <Switch>
            <Route path='/login' render= {this.renderForm} />
          </Switch>
        </main>

      </div>

    );
  }
}

export default withRouter(App);
