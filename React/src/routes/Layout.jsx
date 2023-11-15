import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/alumnos">Alumnos</Link>
          </li>
          <li>
            <Link to="/profesores">Profesores</Link>
          </li>
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};