import { useState } from "react";
import { Link } from "react-router-dom"

export const NuevoCurso = () => {
    const [nuevoCurso, setNuevoCurso] = useState({
      nombreDescriptivo: undefined ,
      turno: undefined,
     
    })

    const subirCurso = async () =>{
        const res = await fetch("http://localhost:4000/curso", {
          method:"POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({curso: nuevoCurso,}),
        });
        if (res.ok) {
          alert("Curso creado");
        } else{
          alert("Fallo al crear curso nuevo")
          console.log("Fallo al crear curso nuevo");
        }
      }
    return (
        <>
           
          <div>
            <div className="d-flex align-items-center justify-content-center ">
              <label className="display-6  label-buscar ">Agregar Curso</label>
            </div>
            <form onSubmit={subirCurso}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        className="form-control"
                        value={nuevoCurso.nombreDescriptivo}
                        onChange={(e)=>{setNuevoCurso({...nuevoCurso, nombreDescriptivo:e.target.value})}}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="turno">turno</label>
                        <input type="text"
                        className="form-control"
                        value={nuevoCurso.turno}
                        onChange={(e)=>{setNuevoCurso({...nuevoCurso, turno:e.target.value})}}
                        />
                    </div>
                </div>
                
                <div> 
                <button type="submit" className="form-control btn" >Agregar</button>
                </div>
            </form>
          </div>
            
            
        </>
    )
}