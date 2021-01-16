import react from 'react'
import {Button} from 'semantic-ui-react'

function DeleteProduct(props) {

    let handleClick = (product) => {
        console.log(product.id)
        fetch(`http://localhost:3000/products/${product.id}`, {
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