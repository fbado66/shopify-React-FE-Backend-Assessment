import React, { Component } from 'react';
import {Form, Button, Checkbox} from 'semantic-ui-react'
class NewProductForm extends Component {

  state = {
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    selectedFile: ''
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
  this.setState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    selectedFile: ''
  })
}

  fileSelectedHandler = (e) => {
    console.log(e.target.files[0])
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData()
    fd.append('file', this.state.selectedFile, this.state.selectedFile.name)
    fd.append('upload_preset', 'snapupy')
      fetch('https://api.cloudinary.com/v1_1/personal-space/image/upload', {
        method: "POST",
        body: fd
      })
    .then(res => res.json())
    .then(image_url => {
      this.setState({
        image: image_url.secure_url
      })
    })
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {

    let {name, description, price, category} = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Name'
                    autoComplete="off"
                    name ='name'
                    value={name}
                    onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='What is your product about?'
                    autoComplete="off"
                    name ='description'
                    value={description}
                    onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <img id='imgProductOnForm' src={this.state.image ? this.state.image : './../img_placeholder.png'} />
            <input type="file"
                    id='uploadButton'
                    name="image"
                    onChange={e => {this.fileSelectedHandler(e); 
                      setTimeout( () =>this.fileUploadHandler(), 500)
                    }} />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input placeholder='Price'
                    type='number'
                    autoComplete="off"
                    name ='price'
                    value= {price}
                    onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <input placeholder='Choose'
                    type='text'
                    name ='category'
                    value= {category}
                    onChange={this.handleChange} />
          </Form.Field>
          <Button color='green' id='buttonNewProduct'
           type='submit'>New Product</Button>
        </Form>
      </div>
    );
  }
}

export default NewProductForm;