import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TablaCursos from '../../components/tablaCurso';

export const Cursos = () => {

  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState();
  const [filtro, setFiltro] = useState("")

  const borrarCurso = async () => {
    if (window.confirm("¿Desea eliminar a este profesor?")) {
      const res = await fetch(`http://localhost:4000/curso/${curso.idcurso}`, {
        method: "DELETE",
      });

      if (res.ok) {
        obtenerCursos()
      } else {
        console.log("Fallo al quitar persona");
      }
    }
  };

  const obtenerCursos = async () => {
    const response = await fetch("http://localhost:4000/curso");
    const data = await response.json();
    setCursos(data);
  };
  const buscarCursos = async () => {
    const res = await fetch(`http://localhost:4000/curso/buscar/${filtro}`);
    if(!res.ok) {
      alert("curso no encontrado")
      setFiltro("")
      throw new Error("curso no Encontrado");
    } else{
      const data = await res.json();
      setCursos(data)
    }
  }
  const handleCurso = (curso) => {
    setCurso(curso)
    console.log(curso)
  }
  useEffect(() => {
    obtenerCursos();
  }, []);
  return (
    <>
    <div className="d-flex align-items-center justify-content-center ">
      <label className="display-6  label-buscar" >Buscar Cursos</label>
      </div>
        
      <div className="mb-3 container ">

        <input
          name="filtro"
          className="form-control" 
          placeholder="Ingrese nombre"
          value={filtro}
          onChange={(e) => {setFiltro(e.target.value)
          }}
        />
        <button className='btn' onClick={() =>{
          if (filtro.trim() !=""){
            buscarCursos();
          } else {
          obtenerCursos()
        }
      }}>Buscar</button>
      <Link to={'/cursos/agregar'}>
        <button className="btn btn-dark">Agregar Cursos</button>
      </Link>

      </div>
      <TablaCursos cursos={cursos} curso={handleCurso}></TablaCursos>
    
      
      {curso && < div className="display-6  label-buscar">      
        <h2>{curso.idcurso} {curso.nombreDescriptivo} {curso.turno}</h2>
        <div >
          <Link to={`/cursos/editar/${curso.idcurso}`}>
            <button className="btn btn-light">Editar Curso</button>
          </Link>
          
        </div>
      </div>}


    </>
  )
};