import react from 'react'
import {Button} from 'semantic-ui-react'

function DeleteProduct(props) {

    let handleClick = (product) => {
        console.log(product)
        fetch(`https://snapupy-app-api.herokuapp.com/products/${product.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then((deletedObj) => {
            props.deleteProductFromState(deletedObj.id)
        })
    }

    return (
        <Button color='red'
        onClick = {() => handleClick(props.product)}>Delete</Button>
    )

}
export default DeleteProduct