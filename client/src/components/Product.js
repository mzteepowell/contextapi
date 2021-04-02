import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const Product = props => {
	const { addItem } = useContext(ProductContext);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		addItem({
			...props.product, id: Date.now()
		})
	}

	return (
		<div className="product">
			<img src={props.product.image} alt={`${props.product.title} book`} />
			<form onSubmit={handleSubmit}>
				
			<h1 className="title">{props.product.title}</h1>
			<p className="price">${props.product.price}</p>			
			<button type='submit'>
				Rent Item
			</button>
			</form>
		</div>
	);
};

export default Product;
