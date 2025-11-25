import Cookies from 'js-cookie';
import axios from 'axios'
const token = Cookies.get("jwt"); // Obtener el token de las cookies
const apiUrl = axios.create({
    //baseURL: 'http://127.0.0.1:8000/api',
    //baseURL: 'https://light-jeanie-pedrochacon9621-e6fddc30.koyeb.app/api',
    //baseURL: 'https://restaurant1-backend-ppiv.onrender.com/api',
    baseURL: 'https://restaurant1-backend.vercel.app/api',
    /*headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en todas las solicitudes para que el backend valide rol del usuario en todo momento
    },*/
})
// Interceptor solo para apiUrl
apiUrl.interceptors.request.use((config) => {
  const token = Cookies.get('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Rutas GET--------------------------------------------------------------------------------------------------------------------------------------------
export const todosProductos = ()=>{
    return apiUrl.get('/productos/')
}

export const todosProductosCat = ()=>{
    return apiUrl.get('/productosc/')
}

export const todosCategorias = ()=>{
    return apiUrl.get('/categorias/')
}
export const todosRol= ()=>{
    return apiUrl.get('/rol/')
}
export const todosUsuarios= ()=>{
    return apiUrl.get('/usuarios/')
}
export const todosUsuariosRol= ()=>{
    return apiUrl.get('/usuariosr/')
}
//Rutas GET--------------------------------------------------------------------------------------------------------------------------------------------

// Ruta menus con filtro-----------------------------------------------------------------------------------------------------------------------------
export const filtrarProducto = async ({busqueda, categoria_prod, precio_prod, nombre_prod}) =>{
    const params = new URLSearchParams();
    if (busqueda) params.append("busqueda", busqueda);
    if (categoria_prod) params.append("categoria_prod", categoria_prod);
    if (precio_prod) params.append("precio_prod__lte", precio_prod);
    if (nombre_prod) params.append("nombre_prod__icontains", nombre_prod);

    try {
    const response = await apiUrl.get(`/productosc/?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return [];
  }

}
export const filtrarCategoria = async ({busqueda})=>{
    const params = new URLSearchParams();
    if (busqueda) params.append("busqueda", busqueda);

    try {
        const response = await apiUrl.get(`/categorias/?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error al buscar categorias:", error);
        return [];
    }
}

//BARRA DE BUSQUEDA:
export const buscarProducto = async ({busqueda}, url) => {
  const params = new URLSearchParams();
  if (busqueda) params.append("busqueda", busqueda);
  
  try {
    const response = await apiUrl.get(`/${url}/?${params.toString()}`);
    
    return response.data;
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return [];
  }
};
// Ruta menus con filtro-----------------------------------------------------------------------------------------------------------------------------

//Rutas POST--------------------------------------------------------------------------------------------------------------------------------------------
export const guardarProducto = (producto)=>{
    return apiUrl.post('/productos/', producto)
}
export const guardarCategoria = (categoria)=>{
    return apiUrl.post('/categorias/', categoria)
}
export const guardarRol = (rol)=>{
    return apiUrl.post('/rol/', rol)
}
export const guardarUsuario = (usuario)=>{
    return apiUrl.post('/usuarios/', usuario)
}
//Rutas POST--------------------------------------------------------------------------------------------------------------------------------------------
//Rutas PATCH---------------------------------------------------------------------------------------------------------------------------------------------
export const actualizarProducto = (id_prod, producto)=>{
    return apiUrl.patch(`/productos/${id_prod}/`, producto)
}
export const actualizarCategoria = (id_cat, categoria)=>{
    return apiUrl.patch(`/categorias/${id_cat}/`, categoria)
}
export const actualizarUsuario = (id, usuario)=>{
    return apiUrl.patch(`/usuarios/${id}/`, usuario)
}
//Rutas PATCH---------------------------------------------------------------------------------------------------------------------------------------------

//RUTAS DELETE--------------------------------------------------------------------------------------------------------------------------------------------

export const eliminarUsuario = (id) =>{
    return apiUrl.delete(`/usuarios/${id}/`)
}
export const eliminarProducto = (id_prod) =>{
    return apiUrl.delete(`/productos/${id_prod}/`)
}
export const eliminarCategoria = (id_cat) =>{
    return apiUrl.delete(`/categorias/${id_cat}/`)
}

//RUTAS DELETE--------------------------------------------------------------------------------------------------------------------------------------------

//-----LOGIN y LOGOUT-----------------------------------------------------------------------------------------------------------------------------------------
export const login = async (usuario) => {
  const { username, password } = usuario;
  try {
    const response = await apiUrl.post('/token/', { username, password });
    console.log(response.data);
    
    // Guardar el token en una cookie
    Cookies.set('jwt', response.data.access, {
      expires: 1,
      path: '/',
    });
    // Redirigir si todo salió bien
    window.location.href = "/productos";
  } catch (error) {
    // Si el servidor responde con 401 o hay otro error
    alert("Autenticación incorrecta. Verifica tus credenciales.");
  }
};

export const logout = () => {
    // Eliminar la cookie 'jwt'
    Cookies.remove('jwt', {
        path: '/', 
    });
    // Redirigir al usuario a la pantalla de login
    window.location.href = "/"; 
}
//-----LOGIN y LOGOUT-----------------------------------------------------------------------------------------------------------------------------------------

//Funcion para recibir datos de usuario a traves de la cookie token para los roles--------------------
export const rolUser = () => {
   return apiUrl.get('/me/')
    
}
//Funcion para recibir datos de usuario a traves de la cookie token para los roles--------------------
