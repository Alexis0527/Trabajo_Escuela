import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './routes/Home';
import { Layout } from './routes/Layout';
import { Alumnos } from './routes/alumnos/Alumnos';
import { NuevoAlumno } from './routes/alumnos/NuevoAlumno';
import { EditAlumno } from './routes/alumnos/EditAlumno';

import { Unknown } from './routes/Unknown';
import { Profesores } from './routes/profesores/Profesores';
import { NuevoProfesor } from './routes/profesores/NuevoProfesor';
import { EditProfesor } from './routes/profesores/EditProfesor';

import { Cursos } from './routes/cursos/cursos';
import { NuevoCurso } from './routes/cursos/NuevoCurso';
import { EditCurso } from './routes/cursos/EditCurso';

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
          <Route path='/alumnos/agregar' element={<NuevoAlumno/>} />
          <Route path='/alumnos/editar/:id' element={<EditAlumno/>} />
          <Route path='/alumnos/libreta/:id' element={<LibretaAlumno/>}/>
          <Route path='/alumnos/libreta/:id/notas/:idlib' element={<Notas/>} />
          
        <Route path='/profesores' element={<Profesores/>} ></Route>
          <Route path='/profesores/agregar' element={<NuevoProfesor/>}></Route>
          <Route path='/profesores/editar/:id' element={<EditProfesor/>}></Route>

        <Route path='/cursos' element={<Cursos/>}></Route>

          <Route path='/cursos/agregar' element={<NuevoCurso/>}></Route>

          <Route path='/cursos/editar/:id' element={<EditCurso/>}></Route>  

        

        <Route path="*" element={<Unknown/>} />
      
      </Routes>
    </Router>

      

    


    </>
  )
}

export default App
