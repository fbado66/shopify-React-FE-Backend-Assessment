import React from 'react'
import DeleteProduct from './DeleteProduct'
import {Card, Image, Icon, Button} from 'semantic-ui-react'

function UserProducts(props) {
    console.log(props.currentUserProducts)

    let UserProductsArray = props.currentUserProducts.map(product => {
        if(product.availability === null) {
        return <div key = {product.id} className='productHolder'>
                    <Card>
                        <Image src={product.image} wrapped ui={false} alt={product.name} />
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
        } else if(product.availability === 'onCart'){
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
                        </Card.Content>
                        <Card.Content extra>
                            <Button>SOld Out</Button>
                        </Card.Content>
                        
                    </Card>
                </div>

        }
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