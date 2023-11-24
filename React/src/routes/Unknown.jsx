import { Link } from "react-router-dom"
export const Unknown = () => {
    return(
        <>
            <h1>No se encontró ninguna página</h1>
            <Link to='/'>
                <button className="btn btn-secondary btn-lg">Regresar a inicio</button>
            </Link> 
        </>
        
    )
}