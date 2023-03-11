import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import axios from '../api/axios';
const CATEGORIES_URL = '/categories/';

const Profile = () => {
  const params = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    /* Obtenemos las categorías */
    const getDetails = async () => {
      const response = await axios.get(`${CATEGORIES_URL}${params.id}`);
      setName(response.data.name);
      setDescription(response.data.description);
    }
    /* Llamamos la función */
    getDetails()
      /* Obtenemos el error */
      .catch(console.error);
  }, [params.id])

  /* Funcion del envío del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${CATEGORIES_URL}${params.id}`,
        JSON.stringify({ name, description }),
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: true
        }
      );

      if (response?.status === 200) {
        const newDetails = async () => {
          const response = await axios.get(`${CATEGORIES_URL}${params.id}`);
          setName(response.data.name);
          setDescription(response.data.description);
        }
        /* Llamamos la función */
        newDetails();
      }

      /* Vemos la respuesta del servidor */
      console.log(JSON.stringify(response?.data));

    } catch (error) {
      console.log(error);
      if (!error?.response) {
        /* Aqui no se ha puesto los errores */
        console.log('Error', error.response);
      }
    }
  }

  return (
    <section className="Profile">
      <div className="Profile-wrapper Container">
        <h1 className='Display Space-bottom-5x'>Perfil</h1>
        <div className="Profile-widget">
          <form onSubmit={handleSubmit} className="Profile-form">
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
            <button type="submit" className="btn btn-primary">Guardar cambios</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Profile;