import React from 'react'
import {Button, Grid, Menu, Segment, List, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class MySpace extends React.Component {
    state = { 
        activeItem: 'Messages',
        purchaseProducts: [],
        productsSold: []
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/users/${this.props.current_user}`)
        .then(res => res.json())
        .then(userInfo => {
            this.setState({purchaseProducts: userInfo.orders})
            })
        
        fetch(`http://localhost:3000/orders`)
        .then(res => res.json())
        .then(arrayOrders => {
            this.setState({ productsSold: arrayOrders.filter(order => order.product.user_id === this.props.current_user) })
        })
    }

    

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

// PARTIAL RENDERS -------------------------------------------------------
    messages = () => {
        return <div>
            <p>Welcome {this.props.first_name} this is your space at SnapUpy, in here you can have a general idea of how your products are doing in the market. 
            You can add New products, check your inventory, much more.
            </p>
        </div>
    }


    myProducts = () => {
        let userProducts = this.props.userProducts.map(product => {
            return <div key={product.id}>
                        <List className ='productHolderOnList'>
                            <List.Item id='listProductUser'>
                                <Image id='listImageUserProducts' avatar src={product.image} />
                                    <List.Header>{product.name}</List.Header>
                                    <List.Description> Price: $ {product.price}.00  </List.Description>
                                    <List.Description> Status: Active  </List.Description>
                            </List.Item>
                        </List>
                </div>
        })
        return ( <div>{userProducts}</div> )
    }

    soldHistory = () => {
        let soldProds = this.state.productsSold.map(prods => {
            return <div key={prods.product.id + Math.random()}>
                        <List className ='productHolderOnList'>
                            <List.Item id='listProductUser'>
                                <Image id='listImageUserProducts' avatar src={prods.product.image} />
                                <List.Header>{prods.product.name}</List.Header>
                                <List.Description> Price: $ {prods.product.price}.00  </List.Description>
                                <List.Description> Sold to: {prods.buyer_name} </List.Description>                
                            </List.Item>
                        </List>
                    </div>
        })
        return ( <div>{soldProds}</div>)
    }


    purchaseHistory = () => {
        let purchaseProds = this.state.purchaseProducts.map(purchase => {
            return <div key={purchase.product.id}>
                        <List className ='productHolderOnList'>
                            <List.Item id='listProductUser'>
                                <Image id='listImageUserProducts' avatar src={purchase.product.image} />
                                <List.Header>{purchase.product.name}</List.Header>
                                <List.Description> Price: $ {purchase.product.price}.00  </List.Description>
                                <List.Description> Purchased from: {purchase.product.user_name} </List.Description> 
                                </List.Item>
                        </List>               
                    </div>
        })
        return ( <div>{purchaseProds}</div> )
    }


    segmentDisplay = ''

    segmentToRender = () => {
        if(this.state.activeItem === 'Messages'){
            this.segmentDisplay = this.messages()
        } else if(this.state.activeItem === 'My Products'){
            // setTimeout( () =>{this.segmentDisplay = ''}, 100)
            this.segmentDisplay =  this.myProducts() 

        } else if(this.state.activeItem === 'Sold Inventory'){
            // setTimeout( () =>{this.segmentDisplay = ''}, 10)
            this.segmentDisplay = this.soldHistory()
        } else if(this.state.activeItem === 'Purchase History'){
            // setTimeout( () =>{this.segmentDisplay = ''}, 100)
            this.segmentDisplay = this.purchaseHistory()
        } else if(this.state.activeItem === 'Summary'){
            this.segmentDisplay = 'Summary will go here'
        }else {
            this.segmentDisplay = "Messages"
        }
    }

        

    render() {


        const { activeItem } = this.state
        // let {token, addProduct} = this.props
        return (
            <div>
                {this.segmentToRender()}
                <h1>Welcome to your space </h1>
                <Button color='green' as={Link} to ='./myspace/products/new' >  New Product</Button>
                <Button color='blue' as={Link} to='./myspace/products'>My Products</Button>
                <p>Name {this.props.first_name}</p>

                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name='Messages'
                                active={activeItem === 'Messages'}
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='My Products'
                                active={activeItem === 'My Products'}
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='Sold Inventory'
                                active={activeItem === 'Sold Inventory'}
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='Purchase History'
                                active={activeItem === 'Purchase History'}
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='Summary'
                                active={activeItem === 'Summary'}
                                onClick={this.handleItemClick}/>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={11}>
                        <Segment>
                            {this.segmentDisplay}
                        </Segment>
                        </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default MySpace