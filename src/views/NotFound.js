import { Link, useNavigate } from "react-router-dom";
import '../assets/index.css';


const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="notfound section-pd">
      <div className="notfound_wrapper container">
        <h1 className='notfound_h1'>¡Error 404!</h1>
        <p className='notfound_txt'>¡Ups! la página que estás buscando no existe...</p>
        <Link to="/" className="btn btn-primary" onClick={goBack}>Volver al inicio</Link>
      </div>
    </section>
  )
}

export default NotFound;