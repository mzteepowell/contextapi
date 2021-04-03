import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext'

const Navigation = props => {
  const { cart } = useContext(CartContext);

	return (
		<div className="navigation">
			<nav>
        <ul className='navbar-ul'>
          <li className='navbar-li'>
            <NavLink to='/signup'> SignUp </NavLink>
          </li>
          <li className='navbar-li'>
            <NavLink to='/login'>Login</NavLink>
          </li>
					<li className='navbar-li'>
						{localStorage.getItem('token') && <NavLink to="/products">Products</NavLink>}
					</li>
					<li className='navbar-li'>
						{localStorage.getItem('token') && <NavLink to="/cart">
							Cart <span>{cart.length}</span>
						</NavLink>}
					</li>
          <li className='navbar-li'>
            {localStorage.getItem('token') && <NavLink to="/sellers">Sellers</NavLink>}
					</li>
					<li className='navbar-li'>
            {localStorage.getItem('token') && <Link onClick={props.logout}>Logout</Link>}
          </li>
        </ul>
      </nav>
		</div>
	);
};

export default Navigation;
