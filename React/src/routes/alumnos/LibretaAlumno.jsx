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
      <div className="d-flex align-items-center justify-content-center ">
      <label className="display-6  label-buscar" >Libreta</label>
      </div>

      {libretas && <TablaLibretas libretas={libretas} libreta={handleLibreta}/>}

      {libreta &&<div className="text-center">      
        <h2>{libreta.curso}</h2>
        <div >
        <Link to={`/alumnos/libreta/${id}/notas/${libreta.idlibreta}`}>
          <button className="btn btn-light">Ver notas</button>
        </Link>
        </div>
      </div>}
      <div className='container'>
      {libretas && <button className='btn' onClick={()=>{
        if (!mostrar) {
          setMostrar(true)
        } else{ setMostrar(false)}
      }}> Crear Nueva Libreta</button>}
</div>
  
      {mostrar && <form>
        <div className="d-flex align-items-center justify-content-center ">
      <label className="display-6  label-buscar" >Crear</label>
      </div>
      
      
        <div className="form-group">
        <Select
          options={ cursos.map(cur=> ({label:cur.nombreDescriptivo, value:cur.idcurso}))}
          onChange={handleSelect}/>
        </div>
        <br />
        <div className="form-group"> 
        <button className="btn btn-light" onClick={()=>{
          crearLibreta()
          }}>Crear libreta</button>
        </div> 
        <br /> 
        <div className="form-group">
        <Link to={'/alumnos'}>
        <button className="btn btn-light">regresar</button>
        </Link>
        </div> 

        </form>}
      
      
    
    </>
  )
};