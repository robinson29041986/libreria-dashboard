import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Trash2, Edit2 } from "@easy-eva-icons/react";
import ConfirmationModal from "../components/ConfirmationModal";
import ModalForm from '../components/ModalForm';
import ModalEdit from '../components/ModalEdit';

const PRODUCTS_URL = '/products';
const CATEGORIES_URL = '/categories';

const Products = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [stock, setStock] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    /* Obtenemos los products*/
    const getProducts = async () => {
      const response = await axios.get(PRODUCTS_URL);
      setProducts(response.data);
      console.log(response.data)
    }
    /* Llamamos la función */
    getProducts()
      /* Obtenemos el error */
      .catch(console.error);
  }, []);


  useEffect(() => {
    /* Obtenemos los categorias */
    const getCategories = async () => {
      const response = await axios.get(CATEGORIES_URL);
      setCategories(response.data);
      console.log(response.data)
    }
    /* Llamamos la función */
    getCategories()
      /* Obtenemos el error */
      .catch(console.error);
  }, []);

  /* Función para el metodo POST */
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

      /* cerrar y actualizar */
      if (response?.status === 200) {
        setViewModal(false);
        const response = await axios.get(PRODUCTS_URL);
        setProducts(response.data);
      }

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
  /* FFunción para el metodo PUT  */
  const handleSubmitEdit = async (e) => {
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
      const response = await axios.put(`${PRODUCTS_URL}${productId}`, formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );
      if (response?.status === 200) {
        setEditModal(false);
        const response = await axios.get(PRODUCTS_URL);
        setProducts(response.data);
      }

      /* Vemos la respuesta del servidor */
      console.log(JSON.stringify(response?.data));

      /* Limpiamos el formulario */
      setImage('');
      setName('');
      setDescription('');
      setAutor('');
      setIsbn('');
      setPrice('');
      setStock('');

    } catch (error) {
      console.log(error);
      if (!error?.response) {
        /* Aqui no se ha puesto los errores */
        console.log('Error', error.response);
      }
    }
  }

  const handleClose = () => {
    setShowModal(false);
    setName('');
  }

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      const response = await axios.delete(`${PRODUCTS_URL}${productId}`);
      console.log(response.data);
      /* Actualizamos la tabla */
      if (response.status === 200) {
        const response = await axios.get(PRODUCTS_URL);
        setProducts(response.data);
        setName('');
      }
    } catch (error) {
      /* Aquí toca handlear los errores */
      console.log(error);
    }
  }

  const handleCancel = () => {
    setShowModal(false);
    setName('');
  }

  const handleCreate = () => setViewModal(true);
  const handleCancelCreate = () => setViewModal(false);

  /* Maneja la edición del producto*/
  const handleEdit = async (id, image, name, description, category, price, autor, isbn, stock) => {
    setEditModal(true);
    setProductId(id);
    setImage(image);
    setName(name);
    setDescription(description);
    setCategory(category);
    setCategory(price);
    setAutor(autor);
    setIsbn(isbn);
    setStock(stock);
  }

  const handleCancelEdit = () => {
    setEditModal(false);
    /* Limpiamos el formulario */
    setImage(null);
    setName(null);
    setDescription(null);
    setCategory(null);
    setPrice(null);
    setAutor(null);
    setIsbn(null);
    setStock(null);
  }

  const handleDelete = (id, name) => {
    setProductId(id);
    setName(name);
    setShowModal(true);
  }

  return (
    <section className="products section-pd">
      <div className="container">
        <h1 className='display'>Productos</h1>
        <div className="products_options">
          <form>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className='Default-input'
              placeholder="Buscar..."
            />
          </form>
          <button className='btn btn-primary' onClick={handleCreate}>Nuevo Producto</button>
        </div>
        <div className="card">
          <div className="products_header">
            <h2 className='title'>Lista de Libros</h2>
          </div>
          {
            !products || products.length <= 0 ? (
              <div className="products_message">
                <p>Ningún Producto Encontrado...</p>
              </div>
            ) : (
              <table className='table_list'>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Autor</th>
                    {/* <th>Isbn</th> */}
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
                        <td>
                          <img className='table_image' src={`http://localhost:5000/public/uploads/${products.image}`}
                            alt="{products.name}" />
                        </td>
                        <td className='table_name'>{products.name}</td>
                        <td>{products.category.name}</td>
                        <td>{products.autor}</td>
                        {/* <td>{products.isbn}</td> */}
                        <td>{products.price}</td>
                        <td>{products.stock}</td>
                        <td className='table_actions'>
                          <Edit2 className='table_icon'
                            onClick={() => handleEdit(
                              products.name,
                              products.category.id,
                              products.price,
                              products.autor,
                              products.isbn,
                              products.stock,
                              ''
                            )} />
                          <Trash2 className='table_icon table_icon--del'
                            onClick={() => handleDelete(products.id, products.name)} />
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
      {viewModal && (
        <ModalForm title="Crear Producto" onClose={handleCancelCreate}>
          <form onSubmit={handleSubmit} className="form_wrapper">
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
            <select onChange={(e) => setCategory(e.target.value)} id="selector">
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
        </ModalForm>
      )
      }
      {editModal && (
        <ModalEdit title="Editar Producto" onClose={handleCancelEdit}>
          <form onSubmit={handleSubmitEdit} className="form_wrapper">
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
            <button type="submit" className="btn btn-primary">Guardar cambios</button>
          </form>
        </ModalEdit>
      )
      }
      {showModal && (
        <ConfirmationModal
          title="Eliminar Producto"
          message={`¿Desea eliminar el Producto ${name}?`}
          onClose={handleClose}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />)}
    </section>
  );
}

export default Products;