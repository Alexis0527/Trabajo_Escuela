import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TablaProfesores from '../../components/tablaProfesor';

export const Profesores = () => {

  const [profesores, setProfesores] = useState([]);
  const [profesor,setProfesor] = useState()
  const [filtro, setFiltro] = useState("")

  const borrarProfesor = async () => {
    if (window.confirm("¿Desea eliminar a este profesor?")) {
      const res = await fetch(`http://localhost:4000/profesor/${profesor.idprofesor}`, {
        method: "DELETE",
      });

      if (res.ok) {
        obtenerProfesores()
      } else {
        console.log("Fallo al quitar persona");
      }
    }
  };

  const obtenerProfesores = async () => {
    const response = await fetch("http://localhost:4000/profesor");
    const data = await response.json();
    setProfesores(data);
  };
  const buscarProfesores = async () => {
    const res = await fetch(`http://localhost:4000/profesor/buscar/${filtro}`);
    if(!res.ok) {
      alert("profesores no encontrados")
      setFiltro("")
      throw new Error("profesores no Encontrado");
    } else{
      const data = await res.json();
      setProfesores(data)
    }
  }
  const handleProfesor = (profesor) => {
    setProfesor(profesor)
    console.log(profesor)
  }
  useEffect(() => {
    obtenerProfesores();
  }, []);
  return (
    <>
    <div className="d-flex align-items-center justify-content-center ">
      <label className="display-6  label-buscar" >Buscar Profesores</label>
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
            buscarProfesores();
          } else {
          obtenerProfesores()
        }
      }}>Buscar</button>
      <Link to={'/profesores/agregar'}>
        <button className="btn btn-dark">Agregar Profesor</button>
      </Link>

      </div>
      <TablaProfesores profesores={profesores} profesor={handleProfesor}></TablaProfesores>
    
      
      {profesor &&< div className="display-6  label-buscar">      
        <h2>{profesor.dni}: {profesor.apellido} {profesor.nombre}</h2>
        <div >
          <Link to={`/profesores/editar/${profesor.idprofesor}`}>
            <button className="btn btn-light">Editar profesor</button>
          </Link>
          <button className="btn btn-light" onClick={
            borrarProfesor
          }>Eliminar profesor</button>
        </div>
      </div>}


    </>
  )
};