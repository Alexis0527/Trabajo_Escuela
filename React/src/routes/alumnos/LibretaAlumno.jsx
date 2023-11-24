import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TablaLibretas from '../../components/tablaLibreta';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import Select from 'react-select';

export const LibretaAlumno = () => {

  const [libretas, setLibretas] = useState();
  const [libreta,setLibreta] = useState()
  const [cursos,setCursos] = useState([])
  const [curso,setCurso] = useState()
  const [mostrar,setMostrar] = useState(false)
  const {id} = useParams()
 

  const obtenerLibretas = async () => {
    const response = await fetch(`http://localhost:4000/alumno/${id}/libreta`);
    if(response.ok) {
      const data = await response.json();
      setLibretas(data);
    } else{
      setMostrar(true)
    }
  };
  const obtCursos = async () => {
    const response = await fetch(`http://localhost:4000/curso`);
    const data = await response.json();
    setCursos(data);
  };
  const crearLibreta = async() => {
    const res = await fetch(`http://localhost:4000/libreta/${id}/${curso.value}`, {
          method:"POST",
          headers: {"Content-Type" : "application/json"},
        });
        if (res.ok) {
          alert("Libreta creada");
          obtenerLibretas()
          setMostrar(false)
        } else{
          alert("Fallo al crear Libreta")
          console.log("Fallo al crear Libreta");
        }
      }

  const handleLibreta = (libreta) => {
    setLibreta(libreta)
    console.log(libreta)
  }

  const handleSelect = (e) => {
    setCurso(e)
    console.log(e.value)
  }
  
  useEffect(() => {
    obtenerLibretas();
    obtCursos()
  }, []);
  return (
    <>
      <h1>Libretas</h1>
      {libretas && <TablaLibretas libretas={libretas} libreta={handleLibreta}/>}
      {libreta &&<div className="text-center">      
        <h2>{libreta.curso}</h2>
        <div >
        <Link to={`/alumnos/libreta/${id}/notas/${libreta.idlibreta}`}>
          <button className="btn btn-light">Ver notas</button>
        </Link>
        </div>
      </div>}
      
      {mostrar && <div className='container'>
        <h3>Crear nueva libreta</h3>
        <Select
          options={ cursos.map(cur=> ({label:cur.nombreDescriptivo, value:cur.idcurso}))}
          onChange={handleSelect}/>
        <button className="btn btn-light" onClick={()=>{
          crearLibreta()
          }}>Crear libreta</button>
        </div>}
      {libretas && <button className='text-center' onClick={()=>{
        if (!mostrar) {
          setMostrar(true)
        } else{ setMostrar(false)}
      }}> Mostrar/ocultar pestaña de creacion</button>}

      <Link to={'/alumnos'}>
        <button className="btn btn-light">regresar</button>
      </Link>
    </>
  )
};