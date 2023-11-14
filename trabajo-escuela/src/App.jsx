import { useEffect, useState } from 'react'
import TablaAlumnos from './components/tablaAlumno';


import './App.css'

function App() {


  const [alumnos, setAlumnos] = useState([]);
  const [alumno,setAlumno] = useState()

  const obtenerAlumnos = async () => {
    const response = await fetch("http://localhost:4000/alumno");
    const data = await response.json();
    setAlumnos(data);
  };
  const handleAlumno = () => {
    setAlumno(alumno)
  }
  useEffect(() => {
    obtenerAlumnos();
  }, []);


  //------------------------------------------------------
  
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const handleClick = () => {
    setMostrarComponente(!mostrarComponente); // Cambia el estado al opuesto del estado actual
  };

  

  //HTML
  return (
    <> <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="/">Escuela</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
          <div>
          <button onClick={handleClick}>Buscar Alumno</button>
          </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/servicios">Buscar Profesor </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contacto">Buscar Curso</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
      <div>
      {mostrarComponente && <TablaAlumnos alumnos={alumnos} alumno={handleAlumno}></TablaAlumnos>}
      </div>
      
    </>
  )
}

export default App
