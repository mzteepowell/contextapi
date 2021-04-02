import * as yup from 'yup';

export const signUpFormSchema = yup.object().shape({
  first_name: yup.string()
    .required('first name is required'),
  last_name: yup.string()
    .required('last name is required'),
  role: yup.string()
    .oneOf(['owner','renter'], 'role is required'),
  email: yup.string()
    .required('username is required')
    .min(3, 'username must be 3 characters long'),
  password: yup.string()
    .required('password is required')
    .min(3, 'password must be 3 characters long'),
})

export const itemFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a name for the item')
    .min(4, 'The item name must be at least 4 characters long'),
  category: yup
    .string()
    .oneOf(['camera', 'video_recording', 'live_audio', 'audio_recording', 'three_d_print', 'computer', 'printer', 'other'], 'You must enter at least one category for the item'),
  brand: yup
    .string()
    .required('You must enter a brand name for the item'),
  model: yup
    .string()
    .required('You must enter a model name for the item'),
  model_no: yup.string(),
  description: yup
    .string()
    .required('You must enter a description for the item')
    .min(10, 'The description must be at least 10 characters long'),
  max_rent:yup
    .number()
    .required('You must enter a minimum rental duration')
    .min(1)
    .max(100),
  min_rent: yup
    .number()
    .required('You must enter a maximum rental duration')
    .min(1)
    .max(100),
  price: yup
    .number()
    .required('You must enter a suggested rental price')
    .min(1)
})

