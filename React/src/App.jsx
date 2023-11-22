import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './routes/Home';
import { Layout } from './routes/Layout';
import { Alumnos } from './routes/alumnos/Alumnos';
import { NuevoAlumno } from './routes/alumnos/NuevoAlumno';
import { EditAlumno } from './routes/alumnos/editAlumno';
import { Unknown } from './routes/Unknown';

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
        {/*<Route path='/profesores' element={} ></Route>*/}
        <Route path="*" element={<Unknown/>} />
      
      </Routes>
    </Router>

      

    


    </>
  )
}

export default App
