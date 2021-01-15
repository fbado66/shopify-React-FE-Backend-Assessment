import React from 'react'
import { withRouter } from 'react-router-dom'
import {Button} from 'semantic-ui-react'

class NewOrder extends React.Component {

    handleClick = (product) => {
        if(this.props.token){
        fetch('http://localhost:3000/orders', {
            method: "POST", 
            headers: {
                'Content-Type': 'Application/json',
                'authorization': this.props.token
            },
            body: JSON.stringify({
                product_id: product.id,
                quantity: 1
            })
        })
        .then(res => res.json())
        .then(console.log)
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