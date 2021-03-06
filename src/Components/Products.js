import React from 'react'
import NewOrder from './NewOrder'
import { Card, Icon, Image } from 'semantic-ui-react'


function Products(props) {
    console.log(props.cart_id)

    let condition = ''

    let productArray = props.products.map(product => {
        
        if(props.current_userID !== product.user_id){
            condition = <NewOrder product = {product}
                                    token = {props.token}
                                    tempCart = {props.tempCart}
                                    cart_id = {props.cart_id}
                                    updateProductsOnCart = {props.updateProductsOnCart}
                        />
        } else {
            condition = ''
        }
    
        return <div key = {product.id} className='productHolder'>
                    <Card>
                        <Image src={product.image} wrapped ui={false} alt={product.name}/>
                        <Card.Content>
                        <Card.Header>{product.name}</Card.Header>
                        <Card.Meta>
                            <span className='capt'>{product.category}</span>
                        </Card.Meta>
                        <Card.Description>{product.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra><Icon name='dollar'/>{product.price}.00
                        <span className='addToCart'>{condition}</span></Card.Content>
                    </Card>
                </div>
    })

    return(
        <div>
            <h1>Products </h1>
            <div className='productsGrid'>{productArray}</div>
        </div>
    )
}

export default Products