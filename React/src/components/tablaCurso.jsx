const TablaCursos = ({ cursos, curso }) => {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Nombre Del Curso</th>
              <th>Turno</th>

            </tr>
          </thead>
          <tbody>
            {cursos.map((cur) => (
              <tr key={cur.idcurso} onDoubleClick={() => {curso(cur)}}>
                <td>{cur.nombreDescriptivo}</td>
                <td>{cur.turno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TablaCursos;