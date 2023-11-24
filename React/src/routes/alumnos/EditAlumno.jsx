import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import moment from "moment";

export const EditAlumno = () => {
    const [nuevoAlumno, setNuevoAlumno] = useState({
        nombre: "",
        apellido: "",
        dni:"",
        fechaNacimiento:"",
        direccion:"",
        nomCompletoTutor:"",
        numeroTutor:"" ,
        direccionTutor:""
    })
    const {id} = useParams()

    const pedirAlumno = async () =>{
        const res = await fetch(`http://localhost:4000/alumno/${id}`);
        const data = await res.json();
        setNuevoAlumno({...data, fechaNacimiento: moment(data.fechaNacimiento).format("YYYY-MM-DD")});
    }
    const editAlumno = async () =>{
        const res = await fetch(`http://localhost:4000/alumno/${id}`, {
          method:"PUT",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({alumno: nuevoAlumno,}),
        });
        if (res.ok) {
            alert("Alumno editado")
        } else{
            alert("Fallo al editar alumno")
          console.log("Fallo al editar alumno");
        }
      }

    useEffect(() => {
        pedirAlumno();
    }, []);
    return (
        <>
            <div className="d-flex align-items-center justify-content-center ">
            <label className="display-6  label-buscar ">Editar Alumno</label>
            </div>
            <form onSubmit={editAlumno}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        className="form-control"
                        value={nuevoAlumno.nombre} onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, nombre:e.target.value})}}
                     />
                    </div>
                     <div className="col">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text"
                            className="form-control"
                            value={nuevoAlumno.apellido}
                            onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, apellido:e.target.value})}}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dni">DNI</label>
                    <input
                        className="form-control"
                        value={nuevoAlumno.dni}
                        onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, dni:e.target.value})}}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="FechaNacimiento">Fecha de Nacimiento</label>
                    <input type="date"
                        className="form-control"
                        value={nuevoAlumno.fechaNacimiento}
                        onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, fechaNacimiento:e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text"
                        className="form-control"
                        value={nuevoAlumno.direccion}
                        onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, direccion:e.target.value})}}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="nomComTutor">Nombre completo del Tutor</label>
                    <input type="text"
                        className="form-control"
                        value={nuevoAlumno.nomCompletoTutor}
                        onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, nomCompletoTutor:e.target.value})}}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="numTutor">Número del tutor</label>
                    <input type="text"
                        className="form-control"
                        value={nuevoAlumno.numeroTutor}
                        onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, numeroTutor:e.target.value})}}
                        />
                </div>
                <div className="form-group">
                        <label htmlFor="direTutor">Dirección del tutor</label>
                        <input type="text"
                        className="form-control"
                        value={nuevoAlumno.direccionTutor}
                        onChange={(e)=>{setNuevoAlumno({...nuevoAlumno, direccionTutor:e.target.value})}}
                        />
                </div>
                    <button type="submit" className="form-control btn">Editar</button>
                </form>
            
    
        </>
    )
}