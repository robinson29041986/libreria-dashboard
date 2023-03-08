import React, { useState } from 'react';
import '../assets/index.css';

import axios from '../api/axios';
const CATEGORIES_URL = '/categories';

const NewCategory = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  /* Funcion del envío del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(CATEGORIES_URL,
        JSON.stringify({ name, description }),
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: true
        }
      );

      /* Vemos la respuesta del servidor */
      console.log(JSON.stringify(response?.data));

      /* Limpiamos el formulario */
      setName('');
      setDescription('');

    } catch (error) {
      console.log(error);
      if (!error?.response) {
        /* Aqui no se ha puesto los errores */
        console.log('Error', error.response);
      }
    }
  }

  return (
    <section className="newcategory section-pd">
      <div className="newcategory-wrapper container">
        <h1 className='display'>Crear categoría</h1>
        <div className="newcategory-widget">
          <form onSubmit={handleSubmit} className="newcategory-form">
            <label htmlFor='name'>Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder='Nombre'
            />
            <label htmlFor='description'>Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id='description'
              rows="5" cols="33"
              placeholder='Descripción'
            />
            <button type="submit" className="btn btn-primary">Crear categoría</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewCategory;