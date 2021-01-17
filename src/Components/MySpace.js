import React from 'react'
import {Button, Grid, Menu, Segment, List, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class MySpace extends React.Component {
    state = { 
        activeItem: 'Messages',
        HoldAllOders: [],
        productsSold: []
    }

    componentDidMount = () => {
        fetch(`https://snapupy-app-api.herokuapp.com/users/${this.props.current_user}`)
        .then(res => res.json())
        .then(userInfo => {
            console.log(userInfo)
            // if(userInfo.carts.map(cart => cart.availability === 'onCart')){
                this.setState({
                    HoldAllOders: userInfo.carts.filter(cart => cart.bought === true),
                    productsSold: userInfo.products.filter(product =>product.availability === 'onCart')
                })
        })
    }

    

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

// PARTIAL RENDERS -------------------------------------------------------
    messages = () => {
        return <div>
            <p className='message'>Welcome {this.props.first_name} this is your space at SnapUpy.<br/> In here you can have a general idea of how your products are doing in the market.<br/>
            You can add New products, check your inventory, and much more.
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
            return <div key={prods.id + Math.random()}>
                        <List className ='productHolderOnList'>
                            <List.Item id='listProductUser'>
                                <Image id='listImageUserProducts' avatar src={prods.image} />
                                <List.Header>{prods.name}</List.Header>
                                <List.Description> Price: $ {prods.price}.00  </List.Description>
                                {/* <List.Description> Sold to: {prods.buyer_name} </List.Description>                 */}
                            </List.Item>
                        </List>
                    </div>
        })
        return ( <div>{soldProds}</div>)
    }


    purchaseHistory = () => {
        let purchaseProducts = []
        if((this.state.HoldAllOders.map(order => order.bought)).toString() === 'true'){
            purchaseProducts = this.state.HoldAllOders.map(order => order.orders.map( order =>{
                return <div key={order.id}>
                    <List className ='productHolderOnList'>
                            <List.Item id='listProductUser'>
                                <Image id='listImageUserProducts' avatar src={order.product.image} />
                                <List.Header>{order.product.name}</List.Header>
                                <List.Description> Price: $ {order.product.price}.00  </List.Description>
                                <List.Description> Purchased from: {order.product.user_name} </List.Description> 
                                </List.Item>
                         </List>  
                </div>
            }))
        } return (<div>{purchaseProducts}</div>)
    }

    summary = () => {
        return <div>Work on this feature is set for next week</div>
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
            this.segmentDisplay = this.summary()
        }else {
            this.segmentDisplay = "Messages"
        }
    }

        

    render() {
        console.log(this.state.productsSold)

        const { activeItem } = this.state
        return (
            <div>
                {this.segmentToRender()}
                <h1 className='headerMySpace'>Welcome to your space {this.props.first_name}</h1>
                    <div className='holdButtons'>
                        <Button color='green' as={Link} to ='./myspace/products/new' >  New Product</Button> 
                        <Button color='blue' as={Link} to='./myspace/products' id='products'>My Products</Button>
                    </div>

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