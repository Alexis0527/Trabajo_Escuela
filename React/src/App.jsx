
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Alumnos } from './routes/Alumnos';
import { Home } from './routes/Home';
import { Layout } from './routes/Layout';

function App() {
  

  //HTML
  return (
    <>
    <Router>
      <Layout/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/alumnos' element={<Alumnos />}></Route>
        {/*<Route path='/profesores' element={} ></Route>*/}
      
      </Routes>
    </Router>

      

    


    </>
  )
}

export default App
