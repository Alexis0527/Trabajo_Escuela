import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

export const EditCurso = () => {
    const [nuevoCurso, setNuevoCurso] = useState({
        nombreDescriptivo: "",
        turno: "",
    })
    const {id} = useParams()

    const pedirCurso = async () =>{
        const res = await fetch(`http://localhost:4000/curso/${id}`);
        const data = await res.json();
        setNuevoCurso(data);
    }
    const editCurso = async () =>{
        const res = await fetch(`http://localhost:4000/curso/${id}`, {
          method:"PUT",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({curso: nuevoCurso,}),
        });
        if (res.ok) {
            alert("Curso editado")
        } else{
            alert("Fallo al editar El Curso")
          console.log("Fallo al editar El Curso");
        }
      }
    useEffect(() => {
        pedirCurso();
    }, []);
    return (
        <>
            <div className="d-flex align-items-center justify-content-center ">
            <label className="display-6  label-buscar ">Editar Curso</label>
            </div>
            <form onSubmit={editCurso}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        className="form-control"
                        value={nuevoCurso.nombreDescriptivo} onChange={(e)=>{setNuevoCurso({...nuevoCurso, nombreDescriptivo:e.target.value})}}
                     />
                    </div>
                     <div className="col">
                        <label htmlFor="turno">Turno</label>
                        <input type="text"
                            className="form-control"
                            value={nuevoCurso.turno}
                            onChange={(e)=>{setNuevoCurso({...nuevoCurso, turno:e.target.value})}}
                        />
                    </div>
                </div>
                   <button type="submit" className="form-control btn">Editar</button>
                </form>
            
        </>
    )
}