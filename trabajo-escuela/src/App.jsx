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


  //HTML
  return (
    <>
      <div>
        <TablaAlumnos alumnos={alumnos} alumno={handleAlumno}></TablaAlumnos>
 
      </div>

    </>
  )
}

export default App
