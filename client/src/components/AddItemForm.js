import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { itemFormSchema } from '../utils/formSchema';
import axiosWithAuth from '../utils/axiosWithAuth';
import { ProductContext } from '../contexts/ProductContext';

export default function AddItemForm(props) {
  const { setProducts } = useContext(ProductContext)
  const {push} = useHistory();

    // Setting initial form values 
  const initialFormValues = {
    id: Date.now(),
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

  // Setting variables into newProducts

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [newProducts, setNewProducts] = useState([]);


  // Using axios to post successfully submitted form with new item data to backend location
  const postNewItem = newItem => {
    axiosWithAuth()
    .post('http://localhost:5000/api/products', newItem) 
      .then((res) => {
        console.log(res.data)
        setProducts(res.data, { id: Date.now() })
        setNewProducts(res.data, { id: Date.now() })
        push(`/products`); // Successful post returns to dashboard
      })
      .catch(err => {
        console.log(err);
      })

      .finally(setFormValues(initialFormValues)) // Form is reset regardless
  }
  console.log(newProducts)

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
      title: formValues.title.trim(),
      price: formValues.price.trim(),
      image: formValues.image.trim(),
      description: formValues.description.trim(),
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
    push('/sellers');
  }

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    inputChange(name, valueToUse);
  }

  return (
    <div>
      <div className='home-wrapper'>
        <nav className='nav'>
        <h2>Add a New Item</h2>
        </nav>
        <div className='item-wrapper'>
          
        <form classame='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <label className='form-row'>Title:
              <input
                  value={formValues.name}
                  onChange={onChange}
                  name='title'
                  type='text'
                  />
              </label>        
            <label className='form-row'>Price:
              <input
                  value={formValues.brand}
                  onChange={onChange}
                  name='price'
                  type='text'
                  />
              </label>
            <label className='form-row'>Image URL:
              <input
                  value={formValues.model}
                  onChange={onChange}
                  name='image'
                  type='text'
                  />
            </label>
          <label className='form-row'>Description:
              <input
                  value={formValues.model_no}
                  onChange={onChange}
                  name='description'
                  type='text'
                  />
            </label>
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
          </section>
          </div>
              <div className='buttons'>
                <div className='form-button'>
            <button disabled={disabled} id='submitBtn' >Add Item</button>
                </div>
                <div className='form-button'>
                  
            <button onClick={onCancel} id='cancelBtn' >Cancel</button>
                </div>
                
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}