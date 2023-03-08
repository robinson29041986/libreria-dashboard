import React, { useEffect, useState } from 'react';
import '../assets/index.css'

import axios from '../api/axios';
const CATEGORIES_URL = '/categories';
const PRODUCTS_URL = '/products';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [stock, setStock] = useState('');

  console.log(name)
  console.log(stock)
  console.log(price)
  console.log(category)

  useEffect(() => {
    /* Obtenemos las categorías */
    const getCategories = async () => {
      const response = await axios.get(CATEGORIES_URL);
      setCategories(response.data);
    }
    /* Llamamos la función */
    getCategories()
      /* Obtenemos el error */
      .catch(console.error);
  }, [])

  /* Funcion del envío del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', category);
    formData.append('autor', autor);
    formData.append('isbn', isbn);
    formData.append('stock', stock);

    console.log([...formData]);

    try {
      const response = await axios.post(PRODUCTS_URL, formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      /* Vemos la respuesta del servidor */
      console.log(JSON.stringify(response?.data));

      /* Limpiamos el formulario*/
      setImage('');
      setName('');
      setDescription('');
      setAutor('');
      setIsbn('');
      setPrice('');
      setStock('');

    } catch (error) {
      console.log(error.response.data.message);
      if (!error?.response) {
        /* Aqui no se ha puesto los errores */
        console.log(error.response);
      }
    }
  }

  return (
    <section className="newproduct section-pd">
      <div className="newproduct-wrapper container">
        <h1 className='display'>Crear producto</h1>
        <div className="nemproduct-widget">
          <form onSubmit={handleSubmit} className="newproduct-form">
            <label htmlFor='image'>Imagen</label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
            /*required */
            />
            <label htmlFor='name'>Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder='Nombre'
              required
            />
            <label htmlFor='description'>Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id='description'
              rows="5" cols="33"
              placeholder='Descripción'
            />
            <label htmlFor='autor'>Autor</label>
            <input
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              type="text"
              id="autor"
              placeholder='Autor'
              required
            />
            <label htmlFor='isbn'>Isbn</label>
            <input
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              type="number"
              id="isbn"
              placeholder='Isbn'
              required
            />
            <label htmlFor='category'>Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} id="selector">
              <option value="select" hidden>Seleccionar</option>
              {categories.map((categories, index) => (
                <option value={categories.id} key={index}>{categories.name}</option>
              ))}
            </select>
            <label htmlFor='price'>Precio</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
              placeholder='Precio'
              required
            />
            <label htmlFor='stock'>Stock</label>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              id="stock"
              placeholder='Stock'
              required
            />
            <button type="submit" className="btn btn-primary">Crear producto</button>
          </form>
        </div>
      </div>
    </section >
  )
}

export default AddProduct;