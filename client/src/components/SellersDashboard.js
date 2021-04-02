import React from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';
// import axiosWithAuth from '../utils/axiosWithAuth';
import Products from './Products';


const SellersDashboard = (props) => {
    // const [ items, setItems ] = useState([])

  // const { id } = useParams()

//  useEffect(() => {
//    axiosWithAuth()
//     .get(`/products`)
//     .then(res => {
//       console.log({res})
//       setItems(res.data)
//     })
//     .catch(err => {
//       console.log({err})
//     })
//   }, [])
  
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
      	<Products products={props.products} addItem={props.addItem} />
    </div>
  )
}

export default SellersDashboard;