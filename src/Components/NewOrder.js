import React from 'react'
import { withRouter } from 'react-router-dom'
import {Button} from 'semantic-ui-react'

class NewOrder extends React.Component {

    handleClick = (product) => {
        console.log(product)
        if(this.props.token){
        fetch('https://snapupy-app-api.herokuapp.com/orders', {
            method: "POST", 
            headers: {
                'Content-Type': 'Application/json',
                'authorization': this.props.token
            },
            body: JSON.stringify({
                product_id: product.id,
                cart_id: this.props.cart_id
            })
        })
        .then(res => res.json())
        .then(product => {
            this.props.updateProductsOnCart(product)
        })
        
        fetch(`https://snapupy-app-api.herokuapp.com/products/${product.id}`, {
            method: "PATCH",
            headers: {
                "COntent-type": 'Application/json',
                'authorization': this.props.token
            },
            body: JSON.stringify({
                availability: 'onCart'
            })
        })
        .then(res => res.json())
        .then(console.log)
        } else{
            this.props.history.push('/login')
        }
    }

    render () {
        return (
            <div>
                <Button color='green'
                onClick = {() => this.handleClick(this.props.product)}>Add to Cart </Button>
            </div>
        )
    }
}

export default withRouter(NewOrder)