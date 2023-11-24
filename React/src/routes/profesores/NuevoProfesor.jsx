import { useState } from "react";
import { Link } from "react-router-dom"

export const NuevoProfesor = () => {
    const [nuevoProfesor, setNuevoProfesor] = useState({
      nombre: undefined ,
      apellido: undefined,
      dni:undefined,
      direccion:undefined,
    })

    const subirProfesor = async () =>{
        const res = await fetch("http://localhost:4000/profesor", {
          method:"POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({profesor: nuevoProfesor,}),
        });
        if (res.ok) {
          alert("Profesor creado");
        } else{
          alert("Fallo al crear profesor nuevo")
          console.log("Fallo al crear profesor nuevo");
        }
      }
    return (
        <>
           <h1>Ingrese los datos</h1>
            <form onSubmit={subirProfesor}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        className="form-control"
                        value={nuevoProfesor.nombre}
                        onChange={(e)=>{setNuevoProfesor({...nuevoProfesor, nombre:e.target.value})}}
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
                <button disabled={!nuevoProfesor.nombre ||
                    !nuevoProfesor.apellido  ||
                    !nuevoProfesor.dni  ||
                    !nuevoProfesor.direccion 
                    } type="submit">Agregar</button>
            </form>
        
            
            <Link to='/profesores'>
                <button className="btn btn-secondary btn-lg">regresar</button>
            </Link>
        </>
    )
}