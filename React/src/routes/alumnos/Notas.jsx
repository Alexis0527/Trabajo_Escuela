import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import Select from 'react-select';
import TablaNotas from '../../components/tablaNotas';

export const Notas = () => {

  const [notas, setNotas] = useState();
  const [asignaturas,setAsignaturas] = useState([])
  const [nuevaNota,setNuevaNota] = useState(0)
  const [asignatura,setAsignatura] = useState()
  const {idlib, id} = useParams()

  const obtenerNotas = async () => {
    const response = await fetch(`http://localhost:4000/libreta/notas/${idlib}/`);
    if (response.ok){
        const data = await response.json();
        setNotas(data);
    }
  };

  const obtenerAsignaturas = async () => {
    const response = await fetch("http://localhost:4000/asignatura");
    const data = await response.json();
    console.log(data)
    setAsignaturas(data)
}

  const buscarNotas = async (value) => {
    const res = await fetch(`http://localhost:4000/libreta/notas/${idlib}/${value}`);
    if (res.ok) {
        const data = await res.json();
        console.log(data)
        setNotas(data)
    }
  }
  const subirNota = async () =>{
    const res = await fetch(`http://localhost:4000/libreta/notas/${idlib}/${asignatura}/${nuevaNota}`, {
      method:"POST",
      headers: {"Content-Type" : "application/json"},
    });
    if (res.ok) {
      alert("Nota agregada");
      setNuevaNota(0)
      buscarNotas(asignatura)
    } else{
      alert("Fallo al crear alumno nuevo")
      console.log("Fallo al crear alumno nuevo");
      setNuevaNota(0)
    }
  }
  const handleSelect = (e) => {
    const value = e.value
    setAsignatura(value);
    console.log(value);
    buscarNotas(value)
  }
  useEffect(() => {
    obtenerNotas();
    obtenerAsignaturas();
  }, []);
  return (
    <>
        <div className='container'>
            <h1>Seleccionar asignatura</h1>
            <Select
                options={asignaturas.map((asig)=>({label:asig.nombreDescritivo, value:asig.idasignatura}))}
                onChange={handleSelect}/>
                <button onClick={()=>{
                    obtenerNotas()
                    setAsignatura(0)

                }}>Ver todas las notas</button>
            {notas && <TablaNotas notas={notas}/>}
        </div>
      
      {asignatura>0 && <div>
        <input type="number" value={nuevaNota} min="0" max="10" onChange={(e)=> {
                setNuevaNota(e.target.value)
            }}/>
            <button onClick={subirNota}>agregar nota</button>
        </div>}
    
      <Link to={`/alumnos/libreta/${id}`}>
        <button className="btn btn-dark">Regresar</button>
      </Link>
      
    </>
  )
};