import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TablaAlumnos from '../../components/tablaAlumno';

export const Alumnos = () => {

  const [alumnos, setAlumnos] = useState([]);
  const [alumno,setAlumno] = useState()
  const [filtro, setFiltro] = useState("")

  const obtenerAlumnos = async () => {
    const response = await fetch("http://localhost:4000/alumno");
    const data = await response.json();
    setAlumnos(data);
  };
  
  const buscarAlumnos = async () => {
    const res = await fetch(`http://localhost:4000/alumno/buscar/${filtro}`);
    if(!res.ok) {
      alert("Alumnos no encontrados")
      setFiltro("")
      throw new Error("Alumnos no Encontrado");
    } else{
      const data = await res.json();
      setAlumnos(data)
    }
  }
  const handleAlumno = (alumno) => {
    setAlumno(alumno)
    console.log(alumno)
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
          placeholder="Ingrese dni, nombre o apellido"
          value={filtro}
          onChange={(e) => {setFiltro(e.target.value)
          }}
        />
        <button onClick={() =>{
          if (filtro.trim() !=""){
            buscarAlumnos();
          } else {
          obtenerAlumnos()
        }
      }}>Buscar</button>

      </div>
    

      <TablaAlumnos alumnos={alumnos} alumno={handleAlumno}></TablaAlumnos>
      <Link to={'/alumnos/agregar'}>
        <button className="btn btn-dark">Agregar alumno</button>
      </Link>
      
      {alumno &&<div className="text-center">      
        <h2>{alumno.dni}: {alumno.apellido} {alumno.nombre}</h2>
        <div >
          <Link to={`/alumnos/editar/${alumno.idalumno}`}>
            <button className="btn btn-light">Editar alumno</button>
          </Link>
          <Link to={`/alumnos/libreta/${alumno.idalumno}`}>
            <button className="btn btn-light">Consultar libretas</button>
          </Link>
        </div>
      </div>}


    </>
  )
};