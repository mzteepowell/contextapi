import React from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';
// import axiosWithAuth from '../utils/axiosWithAuth';
import Products from './Products';
import Greeting from './Greeting';


const SellersDashboard = (props) => {

  
  return (
    <div>
      <div className="table-title">
          <div className="row">
          <div className="col-sm-6">
          <Greeting />
          </div>
        <div >
          <Link to="/sellers/add" className="btn"><i className="material-icons">&#xE147;</i> <span>Add New Product</span></Link>
          <Link to="/sellers" className="btn">View Added Products</Link>
          </div>
        </div>
      </div>
      	<Products products={props.products} addItem={props.addItem} />
    </div>
  )
}

export default SellersDashboard;