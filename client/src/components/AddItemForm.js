import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import * as yup from 'yup';
import { itemFormSchema } from '../Util/formSchema'
import axiosWithAuth from '../Util/axiosWithAuth';

export default function AddItemForm() {
  const { id } = useParams();
  const push = useHistory();
  
    // Setting initial form values 
  const initialFormValues = {
    title: '',   
    price: '',   
    image: 'https://image.freepik.com/free-vector/coming-soon-message-illuminated-with-light-projector_1284-3622.jpg',
    description: '',
    };

  // Setting initial values for form validation error messages
  const initialFormErrors = {
    title: '',   
    price: '',   
    image: 'https://image.freepik.com/free-vector/coming-soon-message-illuminated-with-light-projector_1284-3622.jpg',
    description: '',
  };

  // Setting initial value for add item form submit button as disabled
  const initialDisabled = true;

  // Setting variables into State

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const { id } = useParams();


  // Using axios to post successfully submitted form with new item data to backend location
  const postNewItem = newItem => {
    axiosWithAuth()
    .post('/products', newItem) /**** Need correct API url ****/
      .then((res) => {
        history.push(`api/renters${id}`); // Successful post returns to dashboard
      })
      .catch(err => {
        console.log(err);
      })

      .finally(setFormValues(initialFormValues)) // Form is reset regardless
  }

  // Event handler functions
  const inputChange = (name, value) => {
    // Using yup.reach for individual form item validation
    yup
      .reach(itemFormSchema, name) 
      .validate(value)
      // Clears error if validation is successful
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          // Validation error from schema if unsuccessful
          [name]: err.errors[0],
        });
      })
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const formSubmit = () => {
    const newItem = {
      name: formValues.name.trim(),
      category: ['camera', 'video_recording', 'live_audio', 'audio_recording', 'three_d_print', 'computer', 'printer', 'other'].filter(category => formValues[category]),
      brand: formValues.brand.trim(),
      model: formValues.model.trim(),
      model_no: formValues.model_no.trim(),
      description: formValues.description.trim(),
      min_rent: formValues.min_rent.trim(),
      max_rent: formValues.max_rent.trim(),
      price: formValues.price.trim()
    };
    postNewItem(newItem);
  }

  // Employing an effect hook to validate the form each time it is updated so the submit button will be enabled once the form is completely valid
  useEffect(() => {
    itemFormSchema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues])

  const onSubmit = evt => {
    evt.preventDefault();
    formSubmit();
  }

  const onCancel = evt => {
    history.push('/');
  }

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    inputChange(name, valueToUse);
  }

  return (
    <main>
      <h2>Add a New Item</h2>
      <form onSubmit={onSubmit}>

        <section className='form-heading'>
          <h3>Item Name</h3>
          <p>Required</p>
        </section>

        <section className='form-item'>
          <label>Name:
            <input
                value={formValues.name}
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
                checked={formValues.camera}
              />
            </label>

            <label>Video Recording
              <input
                type='checkbox'
                name='video_recording'
                onChange={onChange}
                checked={formValues.video_recording}
              />
            </label>

            <label>Live Audio
              <input
                type='checkbox'
                name='live_audio'
                onChange={onChange}
                checked={formValues.live_audio}
              />
            </label>

            <label>Audio Recording
              <input
                type='checkbox'
                name='audio_recording'
                onChange={onChange}
                checked={formValues.audio_recording}
              />
            </label>
          </section>

          <section className='category-list'>
            <label>3D Printers
              <input
                type='checkbox'
                name='three_d_print'
                onChange={onChange}
                checked={formValues.three_d_print}
              />
            </label>

            <label>Computers
              <input
                type='checkbox'
                name='computer'
                onChange={onChange}
                checked={formValues.computer}
              />
            </label>

            <label>Printers
              <input
                type='checkbox'
                name='printer'
                onChange={onChange}
                checked={formValues.printer}
              />
            </label>

            <label>Other
              <input
                type='checkbox'
                name='other'
                onChange={onChange}
                checked={formValues.other}
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
                value={formValues.brand}
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
                value={formValues.model}
                onChange={onChange}
                name='model'
                type='text'
            />
          </label>
        </section>

        <section className='form-heading'>
          <h3>Item Model Number</h3>
          <p>(Optional)</p>
        </section>

        <section className='form-item'>
          <label>Model Number:
            <input
                value={formValues.model_no}
                onChange={onChange}
                name='model_no'
                type='text'
            />
          </label>
        </section>

        <section className='form-heading'>
          <h3>Item Description</h3>
          <p>Required</p>
        </section>

        <section className='form-item'>
          <textarea
              value={formValues.description}
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
                value={formValues.min_rent}
                onChange={onChange}
                name='min_rent'
                type='number'
            />
          </label>

          <label>Maximum Rental Time (days):
            <input
                value={formValues.max_rent}
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
                value={formValues.price}
                onChange={onChange}
                name='price'
                type='number'
            />
          </label>
        </section>

        <section className='form-submit'>
          <section className='errors-section'>
            <p>{formErrors.name}</p>
            <p>{formErrors.category}</p>
            <p>{formErrors.brand}</p>
            <p>{formErrors.model}</p>
            <p>{formErrors.description}</p>
            <p>{formErrors.min_rent}</p>
            <p>{formErrors.max_rent}</p>
            <p>{formErrors.price}</p>
          </section>
          
          <button disabled={disabled} id='submitBtn' >Add Item</button>

          <button onClick={onCancel} id='cancelBtn' >Cancel</button>

        </section>

      </form>
    </main>
  )
}