import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import HomePage from './Components/HomePage'
import Products from './Components/Products'
import LogInForm from './Components/LogInForm'
import RegisterForm from './Components/RegisterForm'
import MySpace from './Components/MySpace'
import Banner from './Components/Banner'
import 'semantic-ui-css/semantic.min.css'

import './App.css';
import UserProducts from './Components/UserComponents/UserProducts';

class App extends React.Component {

  state = {
    products: [],
    user_id: '',
    first_name: '',
    token: '',
    productsIbought: []

  }


  componentDidMount = () => {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(productsArray => {
      this.setState({ products: productsArray })
    })

    fetch('http://localhost:3000/orders')
    .then(res => res.json())
    .then(ordersArray => {
      this.setState({ productsIbought: ordersArray })
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

  // REGISTER HANDLER 
  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted!")
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
        phone: userInfo.phone, 
        capital: 0,
        address: userInfo.address
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.error){
        console.error(res.error)
      } else {
        localStorage.token = res.token
        this.setState({
          first_name: res.user.first_name,
          user_id: res.user.id,
          token: res.token
        })
      }
    })
  }

  // LOGOUT HANDLER 
handleLogOut = () => {
  this.setState({
    id: 0,
    first_name: '',
    productsIbought: []
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
      token: res.token,
      productsIbought: res.user.productsIbought
    })
    this.props.history.push('/myspace')
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
     } else if (routerProps.location.pathname === "/register") {
      return <RegisterForm
              formName="Register Form"
              handleRegisterSubmit={this.handleRegisterSubmit}
            />
    } 
  }


  // UPDATE PRODUCTS 
  addProduct = (product) => {
    let copyOfProducts = [...this.state.products, product]
    this.setState({
      products: copyOfProducts
    })
  }

  // UPDATE STATE WHEN DELETING A PRODUCT
  deleteProductFromState = (deletedId) => {
    let copyOfProducts = this.state.products.filter(productObj => {
      return productObj.id !== deletedId
    })
    this.setState({ products: copyOfProducts})
  }

  // UPDATE PRODUCTS I BOUGHT
  addProductsIBoughtToMyList = (newProductIbought) => {
    let copyOfProdutsIBought = [...this.state.productsIbought, newProductIbought]
    this.setState({
      productsIbought: copyOfProdutsIBought
    })
  }


  // PROFILE - MY SPACE - COMPONENT

  renderMySpace = (routerProps) => {
    if (this.state.token) {
      return <div>
        <MySpace 
        first_name = {this.state.first_name}
        token = {this.state.token}
        addProduct = {this.addProduct}
        />
      </div>
    } else {
      return <Redirect to='/login' />
    }
  }



  renderProducts = (routerProps) => {
    return <div>
      <Products
        token = {this.state.token}
        products = {this.state.products}
        current_userID = {this.state.user_id}
        />
    </div>
  }


  currentUserProducts = (routerProps) => {
    let currentUser = this.state.user_id
    let currentUserProducts = this.state.products.filter(product => {
      if(product.user_id === currentUser){
        return product
      }
    })
    return (
    <UserProducts 
    deleteProductFromState = {this.deleteProductFromState}
    currentUserProducts = {currentUserProducts}/>
    )
  }



  render() {

    return (
      <div>
        <Banner token = {this.state.token}
                name = {this.state.first_name} />
        
        <main>
          <Switch>
            <Route path='/myspace/products' exact render= {this.currentUserProducts} />
            <Route path='/products' exact render = {this.renderProducts} />
            <Route path='/' exact component ={HomePage} />
            <Route path='/login' exact render= {this.renderForm} />
            <Route path='/register' exact render={this.renderForm} />
            <Route path='/myspace' exact render = {this.renderMySpace} />

          </Switch>
        </main>

      </div>

    );
  }
}

export default withRouter(App);
