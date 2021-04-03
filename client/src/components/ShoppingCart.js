import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
// Components
import Item from './ShoppingCartItem';

const ShoppingCart = props => {
	const { cart } = useContext(CartContext);
	const getCartTotal = () => {
		return cart.reduce((acc, value) => {
			if (props.state) {
				return (acc + value.price) * props.state
			}
			else {return acc + value.price;}
		}, 0).toFixed(2);
	};

	const onClick = (e) => {
		window.location.href = '/cart/success';
	}

	return (
		<div className="shopping-cart">
			{cart.map(item => (
				<Item key={item.id} {...item}/>
			))}
			<div className="shopping-cart__checkout">
				<p>Total: ${getCartTotal()}</p>
				<button onClick={onClick}>Checkout</button>
			</div>
		</div>
	);
};

export default ShoppingCart;
