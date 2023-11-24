import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './routes/Home';
import { Layout } from './routes/Layout';
import { Alumnos } from './routes/alumnos/Alumnos';
import { NuevoAlumno } from './routes/alumnos/NuevoAlumno';
import { EditAlumno } from './routes/alumnos/editAlumno';
import { Unknown } from './routes/Unknown';
import { Profesores } from './routes/profesores/Profesores';
import { NuevoProfesor } from './routes/profesores/NuevoProfesor';
import { EditProfesor } from './routes/profesores/EditProfesor';
import { Notas } from './routes/alumnos/Notas';
import { LibretaAlumno } from './routes/alumnos/LibretaAlumno';

function App() {
  

  //HTML
  return (
    <>
    <Router>
      <Layout/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/alumnos' element={<Alumnos />} />
        <Route path='/alumnos/libreta/:id' element={<LibretaAlumno/>}/>
        <Route path='/alumnos/libreta/:id/notas/:idlib' element={<Notas/>} />
          <Route path='/alumnos/agregar' element={<NuevoAlumno/>} />
          <Route path='/alumnos/editar/:id' element={<EditAlumno/>} />
        <Route path='/profesores' element={<Profesores/>} ></Route>
          <Route path='/profesores/agregar' element={<NuevoProfesor/>}></Route>
          <Route path='/profesores/editar/:id' element={<EditProfesor/>}></Route>
        <Route path="*" element={<Unknown/>} />
      
      </Routes>
    </Router>

      

    


    </>
  )
}

export default App
