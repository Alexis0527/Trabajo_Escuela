import { useEffect, useState } from 'react'
import TablaAlumnos from '../components/tablaAlumno';

export const Alumnos = () => {

  const [alumnos, setAlumnos] = useState([]);
  const [alumno,setAlumno] = useState()

  const obtenerAlumnos = async () => {
    const response = await fetch("http://localhost:4000/alumno");
    const data = await response.json();
    setAlumnos(data);
  };
  const handleAlumno = (alumno) => {
    setAlumno(alumno)
  }
  useEffect(() => {
    obtenerAlumnos();
  }, []);
  return (
    <>
        <TablaAlumnos alumnos={alumnos} alumno={handleAlumno}></TablaAlumnos>
        {alumno && 
        <h2>{alumno.dni}: {alumno.apellido} {alumno.nombre}</h2>}

    </>
  )
};