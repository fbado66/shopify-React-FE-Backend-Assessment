import React from 'react'
import NewProductForm from './NewProductForm'

class MySpace extends React.Component {

    render() {

        let {token, addProduct} = this.props
        return (
            <div>
                <h1>Welcome to your space </h1>
                <p>Name {this.props.first_name}</p>
                <NewProductForm 
                token = {token} 
                addProduct = {addProduct}/>
            </div>
        )
    }
}

export default MySpace