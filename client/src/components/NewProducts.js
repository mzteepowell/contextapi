import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NewProductContext } from '../contexts/NewProductContext';
import NewProduct from './NewProduct';

const NewProducts = (props) => {
  const { newProducts } = useContext(NewProductContext)
	return (
		<div>
      <div className="table-title">
          <div className="row">
          <div className="col-sm-6">
              <h2>Sellers Dashboard</h2>
          </div>
        <div >
          <Link to="/sellers/add" className="btn"><i className="material-icons">&#xE147;</i> <span>Add New Product</span></Link>
          <Link to="/sellers" className="btn">View Added Products</Link>
          </div>
        </div>
      </div>
      <div className="products-container">
      </div>
		<div className="products-container">
			{newProducts.map(newProduct => (
				<NewProduct
				key={newProduct.id}
				product={newProduct}
				/>
				))}
		</div>
		</div>
	);
};

export default NewProducts;
