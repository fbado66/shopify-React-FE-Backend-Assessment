import React, { Component} from 'react'
import {List, Image, Button} from 'semantic-ui-react'
import DeleteOrder from './DeleteOrder'
import {withRouter} from 'react-router-dom'


class Cart extends Component {

    state = { 
        activeItem: 'Messages',
        temPurchaseProducts: [],
        HoldAllOders: [],
        productsSold: []
    }

    componentDidMount = () => {

        fetch(`https://snapupy-app-api.herokuapp.com/users/${this.props.current_user}`)
        .then(res => res.json())
        .then(userInfo => {
            if(userInfo.orders.map(order =>order.product.availability).toString() === 'onCart') {
            this.setState({temPurchaseProducts: userInfo.orders})
            } else {
                this.setState({
                    temPurchaseProducts: []
                })
            }
            })

            fetch(`https://snapupy-app-api.herokuapp.com/${this.props.current_user}`)
            .then(res => res.json())
            .then(userInfo => {
                console.log(userInfo)
                    this.setState({
                        HoldAllOders: userInfo.carts.filter(cart => cart.bought === true)
                    })
            })

                fetch(`https://snapupy-app-api.herokuapp.com/orders`)
                .then(res => res.json())
                .then(arrayOrders => {
                    this.setState({ productsSold: arrayOrders.filter(order => order.product.user_id === this.props.current_user) })
                })
    }


    // This is another way I am thinking to create a condition where I can search if the users 
    // already has the products selected in the purchaseProducts Array, then do not display them in cart

    // fetchForProductsToCart = () => {
        
    //     fetch(`http://localhost:3000/users/${this.props.current_user}`)
    //     .then(res => res.json())
    //     .then(userInfo => {
    //         if(userInfo.orders.map(order =>order.product.availability).toString() === 'onCart') {
    //         this.setState({temPurchaseProducts: userInfo.orders})
    //         } else {
    //             this.setState({
    //                 temPurchaseProducts: []
    //             })
    //         }
    //         })
    // }

    handleClick = () => {
        fetch(`https://snapupy-app-api.herokuapp.com/carts/${this.props.cart_id}`, {
            method: "PATCH",
            headers: {
                "COntent-type": 'Application/json'
            },
            body: JSON.stringify({
                bought: true
            })
        })
        .then(res => res.json())
        .then(console.log)

        fetch('https://snapupy-app-api.herokuapp.com/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                "authorization": this.props.token
            },
            body: JSON.stringify({
                bought: false
            })
        })
        .then(res => res.json())
        .then(cartPojo => {
            this.props.updateCartId(cartPojo.id)
        })
        this.props.purchaseProducts(this.state.temPurchaseProducts)
        this.setState({
            temPurchaseProducts: [],
        })
        // this.fetchForProductsToCart()
        this.props.history.push('./myspace')
    }

     // UPDATE STATE WHEN DELETING AN ORDER
        deleteOrderFromState = (deletedId) => {
            let copyOfOrders = this.state.temPurchaseProducts.filter(productObj => {
            return productObj.id !== deletedId
            })
            this.setState({ temPurchaseProducts: copyOfOrders})
        }


    render() {
        
        // let purchaseOrders = this.state.HoldAllOders.map(order => order.orders.map(order => order.product))
        let purchaseProds = this.state.temPurchaseProducts.map(purchase => {

            // if(![purchase.product].includes(purchaseOrders)){
                return <div key={purchase.product.id}>
                        <List className ='productHolderOnList'>
                            <List.Item id='listProductUser'>
                                <Image id='listImageUserProducts' avatar src={purchase.product.image} />
                                <List.Header>{purchase.product.name}</List.Header>
                                <List.Description> Price: $ {purchase.product.price}.00  </List.Description>
                                <List.Description> Seller: {purchase.product.user_name} </List.Description> 
                                </List.Item>
                                <DeleteOrder 
                                deleteOrderFromState = {this.deleteOrderFromState}
                                order = {purchase} />
                        </List>               
                    </div>
                
            // }else if(purchase.product.id === parseInt(this.state.HoldAllOders.map(order => order.orders.map(order => order.product.id)).toString())){
            //     return <div>Returns the products that are not included</div>          
            // }
        })
    

        return (
            <div>
                <p className = 'heroParagraph'>Cart</p>
                    {purchaseProds}
                <Button id ='purchaseButton' color = 'green' onClick = {this.handleClick}>Make final purchase</Button>
            </div> )
        
    }

}

export default withRouter(Cart)

