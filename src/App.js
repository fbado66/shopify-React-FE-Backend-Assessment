import React from 'react';
import Products from './Components/Products'
import './App.css';

class App extends React.Component {

  state = {
    products: []
  }


  componentDidMount = () => {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(productsArray => {
      this.setState({ products: productsArray })
    })
  }


  render() {

    console.log(this.state.products)

    return (
      <div>
        <h1>Shopify Front End </h1>
        <Products
        products = {this.state.products}
        />
      </div>
      
    );
  }
}

export default App;
