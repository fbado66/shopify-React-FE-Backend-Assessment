import React from 'react'
import {Link} from 'react-router-dom'
import { Header, Segment, Button, Icon, Label } from 'semantic-ui-react'

function Banner(props) {
    let logged = 'Log In'
    let myAccount = 'Account'

    if (props.token){
        logged = 'LOG OUT'
        myAccount = `Hi ${props.name}!`
    }

    if (!props.token) {
            return <div>
                        <Segment clearing id='header_ui'>
                            <Header floated='right'>
                                <Button color='blue' animated as={Link} to={'/products'}>
                                    <Button.Content visible>Products</Button.Content>
                                    <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                </Button>

                                <Button color='blue' animated as={Link} to={'/login'}>
                                    <Button.Content visible>{logged}</Button.Content>
                                    <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                </Button>

                                <Button color='blue' animated as={Link} to={'/register'}>
                                    <Button.Content color ='blue' visible>Register</Button.Content>
                                    <Button.Content hidden><Icon name='universal access' /></Button.Content>
                                </Button>
                            </Header>
                            <Header floated='left'>
                                <Label ribbon color='blue' size='big' as={Link} to='/' id='logoIcon'>SnapUpy</Label>
                            </Header>
                        </Segment>
                   </div>
    } else {

        // if (props.orderNumber.length === 0  ){
        //     return <div >
        //                 <Segment clearing id='header_ui'>
        //                     <Header floated='right'>
        //                         <Button basic color='red' animated as={Link} to={'/login'}>
        //                             <Button.Content visible>{logged}</Button.Content>
        //                             <Button.Content hidden><Icon name='arrow right' /></Button.Content>
        //                         </Button>

        //                         <Button basic color ='red' animated as={Link} to={'/profile'}>
        //                             <Button.Content hidden>View Profile</Button.Content>
        //                             <Button.Content visible>{profile}</Button.Content>
        //                         </Button>

        //                         <Button basic color='red' animated='vertical' as={Link} to={'/cart'}>
        //                             <Button.Content hidden>My Cart</Button.Content>
        //                             <Button.Content visible><Icon name='shop' /></Button.Content>
        //                         </Button>  
        //                     </Header>
        //                     <Header floated='left'>
        //                         <Label ribbon as={Link} to='/' id='logoIcon'>Foodies Road</Label>
        //                     </Header>
        //                 </Segment>
        //             </div>
        //     }else {

                return(<Segment clearing id='header_ui'>
                            <Header floated='right'>
                                <Button color='blue' animated as={Link} to={'/products'}>
                                    <Button.Content visible>Products</Button.Content>
                                    <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                </Button>
                                <Button color='blue' animated as={Link} to={'/login'}>
                                    <Button.Content visible>{logged}</Button.Content>
                                    <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                </Button>

                                <Button color ='blue' animated as={Link} to={'/myspace'}>
                                    <Button.Content hidden>Account</Button.Content>
                                    <Button.Content visible>{myAccount}</Button.Content>
                                </Button>

                                {/* <Button basic color='red' animated='vertical' as={Link} to={'/cart'}>
                                    <Button.Content hidden>My Cart</Button.Content>
                                    <Button.Content visible><span className='count'>{props.orderNumber.length} </span><Icon name='shop' /></Button.Content>
                                </Button>   */}
                            </Header>
                            <Header floated='left'>
                                <Label ribbon color='blue' size='big' as={Link} to='/' id='logoIcon'>SnapUpy</Label>
                            </Header>
                        </Segment>
                )
            }
        
}


export default Banner