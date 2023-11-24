import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light " >
        <div className="container">
          <Link className="navbar-brand" to="/"> Escuela</Link>
          <div id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/alumnos">Alumnos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profesores">Profesores</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cursos">Cursos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};