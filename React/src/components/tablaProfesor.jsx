const TablaProfesores = ({ profesores, profesor }) => {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map((al) => (
              <tr key={al.id} onDoubleClick={() => {profesor(al)}
              }>
                <td>{al.dni}</td>
                <td>{al.nombre}</td>
                <td>{al.apellido}</td>
                <td>{al.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TablaProfesores;