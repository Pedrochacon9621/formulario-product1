import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicio } from './paginas/Inicio'
import './App.css'
import { FormularioProductos } from './paginas/FormularioProductos'
import { FormularioCategorias } from './paginas/FormularioCategorias'
import { Productos } from './paginas/Productos'
import { Categorias } from './paginas/Categorias'
import { FormularioUsuarios } from './paginas/FormularioUsuarios'
import { Usuarios } from './paginas/Usuarios'
import { UserProvider } from './context/UserContext'
import { Filtros } from './componentes/Filtros'
import { BarraBusqueda } from './componentes/BarraBusqueda'

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/1' element={<BarraBusqueda/>}/>
            <Route path='/usuariosr' element={<Usuarios/>}/>
            <Route path='/formulariousuarios' element={<FormularioUsuarios/>}/>
            <Route path='/categorias' element={<Categorias/>}/>
            <Route path='/productos' element={<Productos/>}/>
            <Route path='/formularioproductos' element={<FormularioProductos/>}/>
            <Route path='/formulariocategorias' element={<FormularioCategorias/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>  
    </>
  )
}
export default App
