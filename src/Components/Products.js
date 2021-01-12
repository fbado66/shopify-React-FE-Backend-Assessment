import React from 'react'

function Products(props) {
    console.log(props.products)

    let productArray = props.products.map(product => {
        return <div key = {product.id}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>Image will go here --> {product.image}</p>
            <p>Price: ${product.price}.00</p>
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