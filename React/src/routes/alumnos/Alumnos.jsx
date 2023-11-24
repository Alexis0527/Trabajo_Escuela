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
      <div className="d-flex align-items-center justify-content-center ">
      <label className="display-6  label-buscar ">Buscar Alumno</label>
      </div>
        
      <div className="mb-3 container ">
        
        <input
          name="filtro"
          className="form-control" 
          placeholder="Ingrese dni, nombre o apellido"
          value={filtro}
          onChange={(e) => {setFiltro(e.target.value)
          }}
        />
        <button className='btn' onClick={() =>{
          if (filtro.trim() !=""){
            buscarAlumnos();
          } else {
          obtenerAlumnos()
        }
      }}>Buscar</button>

      <Link to={'/alumnos/agregar'}>
        <button className="btn btn-dark " >Agregar alumno</button>
      </Link>

      </div>
      
    

      <TablaAlumnos alumnos={alumnos} alumno={handleAlumno}></TablaAlumnos>
      
      
      {alumno &&<div className="display-6  label-buscar">      
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