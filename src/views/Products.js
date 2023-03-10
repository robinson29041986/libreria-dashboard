import { useState, useEffect } from 'react';
import '../assets/index.css'

import axios from '../api/axios';
import { Edit2, Trash2 } from '@easy-eva-icons/react';
import { Link } from 'react-router-dom';
const PRODUCTS_URL = '/products';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const getProducts = async () => {
    try {
      const resp = await axios.get(PRODUCTS_URL)
      console.log(resp.data);
      setProducts(resp.data);
    } catch (error) {

      console.log(error);

    }
  }

  const delProduct = async (id) => {
    try {
      const resp = await axios.delete(`${PRODUCTS_URL}${id}`)

      if (resp.status === 204) {
        const resp = await axios.get(PRODUCTS_URL);
        setProducts(resp.data)
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="products section-pd">
      <div className="container">
        <h1 className="display">Productos</h1>
        <div className='products_options'>
          <form>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className='Default-input'
              placeholder='Busqueda....'
            />
          </form>
          <Link to='/products/new' className='btn btn-primary'> +Crear Nuevo Producto </Link>
        </div>
        <div className='card'>
          <div className='products_header'>
            <h2 className='Table-heading'>Lista de Libros</h2>
          </div>
          {
            !products || products.length <= 0 ? (
              <div className='products_message'>
                <p>No se encuentran los Libros</p>
              </div>
            ) : (
              <table className='table_list'>
                <thead>
                  <tr>
                    <th>ID</th>
                    {/*  <th>Image</th> */}
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Autor</th>
                    <th>Isbn</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.filter((product) => {
                      return search.toLowerCase() === ''
                        ? product
                        : product.name.toLowerCase().includes(search);
                    }).map((products, index) => (
                      <tr key={index}>
                        <td>{products.id}</td>
                        {/* <td> <img src={products.Image} alt={products.name} /></td> */}
                        <td className='table_name'>{products.name}</td>
                        <td>{products.category.name}</td>
                        <td>{products.autor}</td>
                        <td>{products.isbn}</td>
                        <td>{products.price}</td>
                        <td>{products.stock}</td>
                        <td className='table_actions'>
                          <Link to={'/products/' + products.is}>
                            <Edit2 className='table_icon' />
                          </Link>
                          <Trash2
                            className='table_icon table_icon--del'
                            onClick={() => delProduct(products.id)} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </section>
  );
}
export default Products;