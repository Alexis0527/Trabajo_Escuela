import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

export const EditProfesor = () => {
    const [nuevoProfesor, setNuevoProfesor] = useState({
        nombre: "",
        apellido: "",
        dni:"",
        direccion:"",
    })
    const {id} = useParams()

    const pedirProfesor = async () =>{
        const res = await fetch(`http://localhost:4000/profesor/${id}`);
        const data = await res.json();
        setNuevoProfesor(data);
    }
    const editProfesor = async () =>{
        const res = await fetch(`http://localhost:4000/profesor/${id}`, {
          method:"PUT",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({profesor: nuevoProfesor,}),
        });
        if (res.ok) {
            alert("Profesor editado")
        } else{
            alert("Fallo al editar profesor")
          console.log("Fallo al editar profesor");
        }
      }
    useEffect(() => {
        pedirProfesor();
    }, []);
    return (
        <>
            <h1>Ingrese los datos</h1>
            <form onSubmit={editProfesor}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        className="form-control"
                        value={nuevoProfesor.nombre} onChange={(e)=>{setNuevoProfesor({...nuevoProfesor, nombre:e.target.value})}}
                     />
                    </div>
                     <div className="col">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text"
                            className="form-control"
                            value={nuevoProfesor.apellido}
                            onChange={(e)=>{setNuevoProfesor({...nuevoProfesor, apellido:e.target.value})}}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dni">DNI</label>
                    <input
                        className="form-control"
                        value={nuevoProfesor.dni}
                        onChange={(e)=>{setNuevoProfesor({...nuevoProfesor, dni:e.target.value})}}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text"
                        className="form-control"
                        value={nuevoProfesor.direccion}
                        onChange={(e)=>{setNuevoProfesor({...nuevoProfesor, direccion:e.target.value})}}
                        />
                </div>
                    <button type="submit">Editar</button>
                </form>
            
            <Link to={'/profesores'}>
                <button>regresar</button>
            </Link>
        </>
    )
}