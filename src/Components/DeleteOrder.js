import react from 'react'
import {Button} from 'semantic-ui-react'

function DeleteOrder(props) {
    

    let handleClick = (order) => {
        fetch(`https://snapupy-app-api.herokuapp.com/orders/${order.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then((deletedObj) => {
            props.deleteOrderFromState(deletedObj.id)
        })
    }

    return (
        <Button color='red'
        onClick = {() => handleClick(props.order)}>Delete</Button>
    )

}
export default DeleteOrder