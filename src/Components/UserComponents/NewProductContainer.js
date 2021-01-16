import react from 'react'
import NewProductForm from './../NewProductForm'
function NewProductContainer(props) {
    
    return (
        <div>
            <NewProductForm 
            token ={props.token}
            addProduct = {props.addProduct}/>
            New Product goes here 
        </div>
    )
}

export default NewProductContainer