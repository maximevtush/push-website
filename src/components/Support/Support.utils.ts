import * as Yup from 'yup';

export const supportValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  topic: Yup.string().required('Please select a topic'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});
