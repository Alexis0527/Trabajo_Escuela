/* eslint-disable react/prop-types */
const TablaAlumnos = ({ alumnos, alumno }) => {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Fecha de Nacimiento</th>
              <th>Nombre Tutor</th>
              <th>Numero Tutor</th>
              <th>Dirección Tutor</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((al) => (
              <tr key={al.id} onDoubleClick={() => {alumno(al)}
              }>
                <td>{al.dni}</td>
                <td>{al.nombre}</td>
                <td>{al.apellido}</td>
                <td>{al.direccion}</td>
                <td>{al.fechaNacimiento}</td>
                <td>{al.nomCompletoTutor}</td>
                <td>{al.numeroTutor}</td>
                <td>{al.direccionTutor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TablaAlumnos;
  