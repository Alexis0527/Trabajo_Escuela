const TablaNotas = ({ notas }) => {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Nota</th>
              <th>Asigntaura</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota,k) => (
              <tr key={k} >
                <td>{nota.asignatura}</td>
                <td>{nota.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TablaNotas;