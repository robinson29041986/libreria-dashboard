import React, { useState } from 'react';
import axios from '../api/axios';

const ReusableForm = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(props.submitUrl,
        formData, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        withCredentials: true
      })
      console.log('Form submission successful:', response);
      props.onSubmitSuccess(response.data);
    } catch (error) {
      console.error('Form submission error:', error);
      props.onSubmitError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.fields.map(field => (
        <div className='x' key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" className='btn btn-primary'>{props.btnTitle}</button>
    </form>
  );
};

export default ReusableForm;
