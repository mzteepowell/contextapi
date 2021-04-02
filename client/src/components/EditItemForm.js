import React, { useState, useEffect} from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import axiosWithAuth from '../Util/axiosWithAuth';


export const EditItemForm = (props) => {
  const [item, setItem] = useState([])
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
    .get(`/products/${id}`)
      .then(res => {
      setItem(res.data)
      })
    .catch(err=>{
        console.log(err.response);
      });
  }, [id])

  const onChange = (e) => {
    setItem({
			...item,
			[e.target.name]: e.target.value
		});
		console.log(e.target.name, e.target.value)
		console.log(item)
	
	}
  
  const handleSubmit = (e) => {
    e.preventDefault();
		axiosWithAuth()
    .put(`/products/${id}`, item)
			.then((res) => {
				console.log(res)
				console.log(res.data)
				props.setItem(res.data);
				push(`/api/renters/${id}`)
			})
			.catch(err => {
			console.log(err.response)
		})
	}

  return (
    <main>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <section className='form-heading'>
          <h3>Item Name</h3>
          <p>Required</p>
        </section>
        <section className='form-item'>
          <label>Name:
            <input
                value={item.name}
                onChange={onChange}
                name='name'
                type='text'
            />
          </label>
        </section>
        {/* Checkbox section for item category selection */}
        <section className='form-heading'>
          <h3>Item Categories</h3>
          <p>Select at least 1</p>
        </section>
        <section className='category-selection'>
          <section className='category-list'>
            <label>Camera
              <input
                type='checkbox'
                name='camera'
                onChange={onChange}
                checked={item.camera}
              />
            </label>
            <label>Video Recording
              <input
                type='checkbox'
                name='video_recording'
                onChange={onChange}
                checked={item.video_recording}
              />
            </label>
            <label>Live Audio
              <input
                type='checkbox'
                name='live_audio'
                onChange={onChange}
                checked={item.live_audio}
              />
            </label>
            <label>Audio Recording
              <input
                type='checkbox'
                name='audio_recording'
                onChange={onChange}
                checked={item.audio_recording}
              />
            </label>
          </section>
          <section className='category-list'>
            <label>3D Printers
              <input
                type='checkbox'
                name='three_d_print'
                onChange={onChange}
                checked={item.three_d_print}
              />
            </label>
            <label>Computers
              <input
                type='checkbox'
                name='computer'
                onChange={onChange}
                checked={item.computer}
              />
            </label>
            <label>Printers
              <input
                type='checkbox'
                name='printer'
                onChange={onChange}
                checked={item.printer}
              />
            </label>
            <label>Other
              <input
                type='checkbox'
                name='other'
                onChange={onChange}
                checked={item.other}
              />
            </label>
          </section>
        </section>
        {/* End checkbox section */}     
        <section className='form-heading'>
          <h3>Item Brand</h3>
          <p>Required</p>
        </section>
        <section className='form-item'>
          <label>Brand:
            <input
                value={item.brand}
                onChange={onChange}
                name='brand'
                type='text'
            />
          </label>
        </section>
        <section className='form-heading'>
          <h3>Item Model</h3>
          <p>Required</p>
        </section>
        <section className='form-item'>
          <label>Model:
            <input
                value={item.model}
                onChange={onChange}
                name='model'
                type='text'
            />
          </label>
        </section>
        {/* <section className='form-heading'>
          <h3>Item Model Number</h3>
          <p>(Optional)</p>
        </section>
        <section className='form-item'>
          <label>Model Number:
            <input
                value={item.model_no}
                onChange={onChange}
                name='model_no'
                type='text'
            />
          </label>
        </section> */}
        <section className='form-heading'>
          <h3>Item Description</h3>
          <p>Required</p>
        </section>
        <section className='form-item'>
          <textarea
              value={item.description}
              onChange={onChange}
              name='description'
              type='text'
          />
        </section>
        <section className='form-heading'>
          <h3>Rental Duration Requirements</h3>
          <p>(Optional)</p>
        </section>
        <section className='form-item'>
          <label>Minimum Rental Time (days):
            <input
                value={item.min_rent}
                onChange={onChange}
                name='min_rent'
                type='number'
            />
          </label>
          <label>Maximum Rental Time (days):
            <input
                value={item.max_rent}
                onChange={onChange}
                name='max_rent'
                type='number'
            />
          </label>
        </section>
        <section className='form-heading'>
          <h3>Asking Price</h3>
          <p>Required</p>
        </section>
        <section className='form-item'>
          <label>Asking Price ($ per day):
            <input
                value={item.price}
                onChange={onChange}
                name='price'
                type='number'
            />
          </label>
        </section>
        <section className='form-submit'>         
          <button type='submit' id='submitBtn' >Save</button>
          <Link><button id='cancelBtn' >Cancel</button></Link>
        </section>
      </form>
    </main>
  )
}

export default EditItemForm;