import React from 'react'
import DeleteProduct from './DeleteProduct'
import {Card, Image, Icon, Button} from 'semantic-ui-react'

function UserProducts(props) {
    console.log(props.currentUserProducts.length)

    let UserProductsArray = props.currentUserProducts.map(product => {
        return <div key = {product.id} className='productHolder'>
                    <Card>
                        <Image src={product.image} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{product.name}</Card.Header>
                        <Card.Meta>
                            <span className='capt'>{product.category}</span>
                        </Card.Meta>
                        <Card.Description>{product.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra><Icon name='dollar'/>{product.price}.00
                        </Card.Content>
                        <Card.Content extra>
                            <DeleteProduct 
                            deleteProductFromState = {props.deleteProductFromState}
                            product = {product}/>
                        <Button color = 'yellow' >Edit</Button></Card.Content>
                        
                    </Card>
                </div>
    })

    return(
        <div>
            <h1>My Products </h1>
            <h1>{props.newProductMessage}</h1>
            <div className='productsGrid'>{UserProductsArray}</div>
        </div>
    )

    
}

export default UserProducts