
import { useNavigate } from "react-router-dom";


const Notifications = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="home section-pd">
      <div className="container">
        <h1 className="display">Mis Notificaciones</h1>
        <p className='notfound_txt'>¡Ups! No hay Notificaciones Disponibles...</p>
        <button to="/" className="btn btn-primary" onClick={goBack}>Volver al inicio</button>
      </div>
    </section>
  );
};

export default Notifications;