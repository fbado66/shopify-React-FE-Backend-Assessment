import React, { Component } from 'react';

class NewProductForm extends Component {

  state = {
    name: '',
    description: '',
    image: '',
    price: '',
    category: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props.tiken, this.state.name)
  
  fetch('http://localhost:3000/products', {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      'authorization': this.props.token
    },
    body: JSON.stringify({
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      price: this.state.price,
      category: this.state.category
    })
  })
  .then(res => res.json())
  .then(createdProduct => {
    this.props.addProduct(createdProduct)
  })
}

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {name, description, image, price, category} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>New Product</h1>
        <label>Name:</label>
          <input type="text"
            autoComplete="off"
            name="name"
            value={name}
            onChange={this.handleChange} 
          />
        <label>Description:</label>
          <input type="text"
            autoComplete="off"
            name="description"
            value={description}
            onChange={this.handleChange} 
          />
        <label>image:</label>
          <input type="text"
            autoComplete="off"
            name="image"
            value={image}
            onChange={this.handleChange} 
          />
        <label>Price:</label>
          <input type="number"
            autoComplete="off"
            name="price"
            value={price}
            onChange={this.handleChange} 
          />
        <label>Category:</label>
          <input type="text"
            autoComplete="off"
            name="category"
            value={category}
            onChange={this.handleChange} 
          />
        <input type="submit" value="New Product" />
      </form>
    );
  }

}

export default NewProductForm;