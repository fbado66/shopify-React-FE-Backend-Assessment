import React from 'react'
import {Button, Grid, Menu, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class MySpace extends React.Component {
    state = { 
        activeItem: 'Messages',
        purchaseProducts: []
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/users/${this.props.current_user}`)
        .then(res => res.json())
        .then(userInfo => {
            this.setState({purchaseProducts: userInfo.orders})
            })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    // PARTIAL RENDERS

    messages = () => {
        return <div>
            {this.props.first_name}
        </div>
    }


    myProducts = () => {
        let userProducts = this.props.userProducts.map(product => {
            return <div key={product.id}>
                <p>{product.name}</p>
            </div>
        })
        return (
            <div>{userProducts}</div>
        )
    }


    purchaseHistory = () => {
        let purchaseProds = this.state.purchaseProducts.map(purchase => {
            return <div key={purchase.product.id}>
                    <p>{purchase.product.name}</p>
                </div>
        })
        return (
            <div>{purchaseProds}</div>
            )
    }


    segmentDisplay = ''

    segmentToRender = () => {
        if(this.state.activeItem === 'Messages'){
            this.segmentDisplay = this.messages()
        } else if(this.state.activeItem === 'My Products'){
            this.segmentDisplay = this.myProducts()
        } else if(this.state.activeItem === 'Purchase History'){
            this.segmentDisplay = this.purchaseHistory()
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
                                name='Sold History'
                                active={activeItem === 'Sold History'}
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
                    <Grid.Column stretched width={12}>
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