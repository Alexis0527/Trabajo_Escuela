import { Link } from "react-router-dom"
export const Home = () => {
    return (
        <>
            <h1>Pagina de inicio</h1>
            <div className="container-row">
                <div className="d-flex justify-content-center">
                    <Link to="/alumnos">
                        <button type="button" className="btn btn-secondary btn-lg">Alumnos</button>
                    </Link>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/profesores">
                        <button type="button" className="btn btn-secondary btn-lg">Profesores</button>
                    </Link>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/cursos">
                        <button type="button" className="btn btn-secondary btn-lg">Curso</button>
                    </Link>
                </div>
                    
                    
            </div>
            
        </>
    )
}