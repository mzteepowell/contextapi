import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const NewProducts = (props) => {
  const { addItem } = useContext(ProductContext);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		addItem({
			...props.newProducts, id: Date.now()
		})
	}

  return (
    <div className="product">
			<img src={props.newProducts.image} alt={`${props.newProducts.title} book`} />
			<form onSubmit={handleSubmit}>
				
			<h1 className="title">{props.newProducts.title}</h1>
			<p className="price">${props.newProducts.price}</p>			
			<button type='submit'>
				Rent Item
			</button>
			</form>
		</div>
  )
}

export default NewProducts;