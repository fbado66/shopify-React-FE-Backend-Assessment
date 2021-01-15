import React, { Component } from 'react';

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
    console.log(fd)
    fetch('https://api.cloudinary.com/v1_1/personal-space/image/upload', {
      method: "POST",
      body: fd
    })
   .then(res => res.json())
   .then(image_url => {
     this.setState({
       image: image_url.secure_url
     })
     console.log(image_url.secure_url)
  })
  }


  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {

    console.log(this.state.selectedFile.name)
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
          <img src={this.state.image} />
          <input type="file"
            name="image"
            placeholder = 'Upload an image'
            onChange={e => {this.fileSelectedHandler(e); 
              setTimeout( () =>this.fileUploadHandler(), 500)
            }} 
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