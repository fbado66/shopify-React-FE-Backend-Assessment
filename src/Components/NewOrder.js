import React from 'react'
import { withRouter } from 'react-router-dom'

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
                <button
                onClick = {() => this.handleClick(this.props.product)}>Buy from newOrder </button>
            </div>
        )
    }
}

export default withRouter(NewOrder)