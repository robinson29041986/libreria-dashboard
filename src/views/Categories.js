import { useState, useEffect } from 'react';
import '../assets/index.css';
import axios from '../api/axios';
import { Edit2, Trash2 } from '@easy-eva-icons/react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import ReusableForm from '../components/ReusableForm';

const CATEGORIES_URL = '/categories/';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    /* Obtiene todas las categorías */
    const getCategories = async () => {
      try {
        const resp = await axios.get(CATEGORIES_URL)
        console.log(resp.data);
        setCategories(resp.data);
      } catch (error) {
        /* Aquí toca handlear los errores */
        console.log(error);
      }
    }
    /* Llamamos la función */
    getCategories();
  }, []);

  const handleSubmitSuccess = (response) => {
    console.log('Form submission succeeded:', response);
  };

  const handleSubmitError = (error) => {
    console.error('Form submission error:', error);
  };


  const handleClose = () => {
    setShowModal(false);
  }

  const handleConfirm = async () => {
    try {
      const resp = await axios.delete(`${CATEGORIES_URL}${categoryId}`)
      console.log('Categoria Eliminada');
      if (resp.status === 204) {
        const resp = await axios.get(CATEGORIES_URL);
        setCategories(resp.data)
      }
    } catch (error) {
      console.log(error);
    }

    setShowModal(false);
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  const handleDelete = (id, title) => {
    setCategoryId(id);
    setDeleteTitle(title);
    setShowModal(true);
  }

  return (
    <section className="categories section-pd">
      <div className="container">
        <h1 className="display">Categorias</h1>
        <div className='categories_options'>
          <form>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className='Default-input'
              placeholder="Buscar..."
            />
          </form>
          <Link to='/categories/new' className='btn btn-primary'> +Crear Nueva Categoria</Link>
        </div>
        <div className='card'>
          <div className='categories_header'>
            <h2 className='title'>Lista de Categorias</h2>
            <ReusableForm
              fields={[
                { name: 'name', label: 'Nombre', type: 'text' },
                { name: 'description', label: 'Descripción', type: 'textarea' }
              ]}
              submitUrl={CATEGORIES_URL}
              onSubmitSuccess={handleSubmitSuccess}
              onSubmitError={handleSubmitError}
              btnTitle="Confirmar"
            />
          </div>
          {
            !categories || categories.length <= 0 ? (
              <div className='categories_message'>
                <p>No se encuentran la Categoria</p>
              </div>
            ) : (
              <table className='table_list'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categories.filter((category) => {
                      return search.toLowerCase() === ''
                        ? category
                        : category.name.toLowerCase().includes(search);
                    }).map((categories, index) => (
                      <tr key={index}>
                        <td>{categories.id}</td>
                        <td className='table_name'>{categories.name}</td>
                        <td>{categories.description}</td>
                        <td className='table_actions'>
                          <Link to={'/categories/' + categories.id}>
                            <Edit2 className='table_icon' />
                          </Link>
                          <Trash2 className='table_icon table_icon--del'
                            onClick={() => handleDelete(categories.id, categories.name)} />
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
      {showModal && (<ConfirmationModal

        title='Confirmar eliminacion'
        message={`¿Desea Eliminar la Categoria ${deleteTitle}?`}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}

      />)}
    </section>
  );
}
export default Categories;