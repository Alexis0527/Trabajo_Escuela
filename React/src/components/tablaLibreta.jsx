/* eslint-disable react/prop-types */
const TablaLibretas = ({ libretas, libreta }) => {
  return (
    <div className="container">
      <table className="table table-hover">
        <thead className="table-success">
          <tr>
            <th>Nombre</th>
            <th>Curso</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {libretas.map((lib) => (
            <tr key={lib.id} onDoubleClick={() => {libreta(lib)}
            }>
              <td>{lib.nombre}</td>
              <td>{lib.curso}</td>
              <td>{lib.asistencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaLibretas;
  