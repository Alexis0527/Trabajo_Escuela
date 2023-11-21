import { useEffect, useState } from 'react'
import TablaAlumnos from '../components/tablaAlumno';

export const Alumnos = () => {

  const [alumnos, setAlumnos] = useState([]);
  const [filtrados, setFiltrados] = useState([])
  const [alumno,setAlumno] = useState()
  const [filtro, setFiltro] = useState("")

  const obtenerAlumnos = async () => {
    const response = await fetch("http://localhost:4000/alumno");
    const data = await response.json();
    setAlumnos(data);
    setFiltrados(data)
  };
  const handleAlumno = (alumno) => {
    setAlumno(alumno)
  }
  const handleBusqueda = () => {
    setFiltrados(alumnos.filter((alumno)=> alumno.dni.includes(filtro)))
  }
  useEffect(() => {
    obtenerAlumnos();
  }, []);
  return (
    <>
    <div className="input-group mb-3">
      <input
          name="filtro"
          className="form-control" 
          placeholder="Ingrese dni"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value)
            handleBusqueda()
          }}
        />

    </div>

      <TablaAlumnos alumnos={filtrados} alumno={handleAlumno}></TablaAlumnos>
      <button className="btn btn-dark">Agregar alumno</button>
      {alumno &&<div className="text-center">      
        <h2>{alumno.dni}: {alumno.apellido} {alumno.nombre}</h2>
        <div >
          <button className="btn btn-light">Editar alumno</button>
          <button className="btn btn-light">Consultar libreta</button>
        </div>
      </div>}


    </>
  )
};