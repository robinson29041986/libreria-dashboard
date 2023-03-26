import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Trash2, Edit2 } from "@easy-eva-icons/react";
import ConfirmationModal from "../components/ConfirmationModal";
import ModalForm from '../components/ModalForm';
import ModalEdit from '../components/ModalEdit';

const USERS_URL = '/users/';
const ROLES_URL = '/roles';

const Users = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    /* Obtenemos los usuarios registrados*/
    const getUsers = async () => {
      const response = await axios.get(USERS_URL);
      setUsers(response.data);
      console.log(response.data)
    }
    /* Llamamos la función */
    getUsers()
      /* Obtenemos el error */
      .catch(console.error);
  }, []);


  useEffect(() => {
    /* Obtenemos los roles de los usuarios */
    const getRoles = async () => {
      const response = await axios.get(ROLES_URL);
      setRoles(response.data);
    }
    /* Llamamos la función */
    getRoles()
      /* Obtenemos el error */
      .catch(console.error);
  }, []);

  /* Función para el metodo POST */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(USERS_URL,
        JSON.stringify({ name, email, password, role_id: role }),
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: true
        }
      );

      /* Vemos la respuesta del servidor */
      console.log(response);

      /* Cerrar el modal y actualizar */
      if (response?.status === 200) {
        setViewModal(false);
        const response = await axios.get(USERS_URL);
        setUsers(response.data);
      }

      /* Limpiamos el formulario */
      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.log(error);
      if (!error?.response) {
        /* Aqui no se ha puesto los errores */
        console.log('Error', error.response);
      }
    }
  }

  /* FFunción para el metodo PUT  */
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${USERS_URL}${userId}`,
        JSON.stringify({ name, email, password, role_id: role }),
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: true
        }
      );
      if (response?.status === 200) {
        setEditModal(false);
        const response = await axios.get(USERS_URL);
        setUsers(response.data);
      }

      /* Vemos la respuesta del servidor */
      console.log(JSON.stringify(response?.data));

      /* Limpiamos el formulario */
      setName('');
      setEmail('');
      setPassword('');

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
      const response = await axios.delete(`${USERS_URL}${userId}`);
      console.log(response.data);
      /* Actualizamos la tabla */
      if (response.status === 200) {
        const response = await axios.get(USERS_URL);
        setUsers(response.data);
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

  /* Maneja la edición del empleado */
  const handleEdit = async (id, name, role, email, pass) => {
    setEditModal(true);
    setUserId(id);
    setName(name);
    setRole(role);
    setEmail(email);
    setPassword(pass);
  }

  const handleCancelEdit = () => {
    setEditModal(false);
    /* Limpiamos el formulario */
    setName('');
    setEmail('');
    setPassword('');
  }

  const handleDelete = (id, name) => {
    setUserId(id);
    setName(name);
    setShowModal(true);
  }

  return (
    <section className="users section-pd">
      <div className="container">
        <h1 className='display'>Usuarios</h1>
        <div className="users_options">
          <form>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className='Default-input'
              placeholder="Buscar..."
            />
          </form>
          <button className='btn btn-primary' onClick={handleCreate}>Agregar Usuario</button>
        </div>
        <div className="card">
          <div className="users_header">
            <h2 className='title'>Lista de Usuarios</h2>
          </div>
          {
            !users || users.length <= 0 ? (
              <div className="users_message">
                <p>Ningún Usuario Encontrado...</p>
              </div>
            ) : (
              <table className='table_list'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.filter((user) => {
                      return search.toLowerCase() === ''
                        ? user
                        : user.name.toLowerCase().includes(search);
                    }).map((users, index) => (
                      <tr key={index}>
                        <td>{users.id}</td>
                        <td className='table_name'>{users.name}</td>
                        <td>{users.email}</td>
                        <td>{users.role.name}</td>
                        <td className='table_actions'>
                          <Edit2 className='table_icon'
                            onClick={() => handleEdit(
                              users.id,
                              users.name,
                              users.role.id,
                              users.email,
                              ''
                            )} />
                          <Trash2 className='table_icon table_icon--del'
                            onClick={() => handleDelete(users.id, users.name)} />
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
        <ModalForm title="Agregar Usuario" onClose={handleCancelCreate}>
          <form onSubmit={handleSubmit} className="form_wrapper">
            <label htmlFor='name'>Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder='Nombre'
              required
            />
            <label htmlFor='roles'>Rol</label>
            <select onChange={(e) => setRole(e.target.value)} id="role-selector">
              <option value="select" hidden>Seleccionar</option>
              {roles.map((roles, index) => (
                <option value={roles.id} key={index}>{roles.name}</option>
              ))}
            </select>
            <label htmlFor='email'>Correo</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="off"
              placeholder="Correo electrónico"
              id="email"
              required
            />
            <label htmlFor='password'>Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="off"
              placeholder="********"
              id="password"
              required
            />
            <button type="submit" className="btn btn-primary">Agregar</button>
          </form>
        </ModalForm>
      )
      }
      {editModal && (
        <ModalEdit title="Editar usuario" onClose={handleCancelEdit}>
          <form onSubmit={handleSubmitEdit} className="form_wrapper">
            <label htmlFor='name'>Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder='Nombre'
              required
            />
            <label htmlFor='roles'>Rol</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} id="role-selector">
              {roles.map((roles, index) => (
                <option value={roles.id} key={index}>{roles.name}</option>
              ))}
            </select>
            <label htmlFor='email'>Correo</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="off"
              placeholder="Correo electrónico"
              id="email"
              required
            />
            <label htmlFor='password'>Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              required
            />
            <button type="submit" className="btn btn-primary">Guardar cambios</button>
          </form>
        </ModalEdit>
      )
      }
      {showModal && (
        <ConfirmationModal
          title="Eliminar usuario"
          message={`¿Desea eliminar el usuario ${name}?`}
          onClose={handleClose}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />)}
    </section>
  );
}

export default Users;