import React from 'react'
import NewProductForm from './NewProductForm'
import {Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'



class MySpace extends React.Component {

    render() {

        let {token, addProduct} = this.props
        return (
            <div>
                <h1>Welcome to your space </h1>

                <Button color='blue' as={Link} to='./myspace/products'>My Products</Button>
                <p>Name {this.props.first_name}</p>
                <NewProductForm 
                token = {token} 
                addProduct = {addProduct}/>
            </div>
        )
    }
}

export default MySpace