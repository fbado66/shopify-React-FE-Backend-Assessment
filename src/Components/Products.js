import React from 'react'
import NewOrder from './NewOrder'

function Products(props) {

    let condition = ''

    let productArray = props.products.map(product => {
        
        if(props.current_userID !== product.user_id){
            condition = <NewOrder product = {product}
                                    token = {props.token}
                        />
        } else {
            condition = ''
        }
    
        return <div key = {product.id}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>Image will go here --> {product.image}</p>
            <p>Price: ${product.price}.00</p>
            {condition}
                
            
        </div>
    })

    return(
        <div>
            <h1>Products </h1>
            {productArray}
        </div>
    )
}

export default Products