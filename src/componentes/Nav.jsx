import { NavLink } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { logout } from "../api/api"
export function Nav() {
    const {user, loading } = useUser()
    if (loading || !user) return null;

    return(
        <div>
            <div className="ancho-max">
                <nav className="nav1">
                    <div className="content-menu">
                        <ul className="menu1">
                            <p className="nombreUser">{user.first_name} {user.last_name} {user.rol ==1 ?"(Admin)": "(User)"}</p>
                            <li><NavLink to="/productos"> Productos </NavLink></li>
                            <li><NavLink to="/categorias">Categorías</NavLink></li>
                            {user?.rol === 1 && <li><NavLink to="/usuariosr">Usuarios</NavLink></li>}
                            <li className="menu-desplega">Nuevo registro
                                <ul className="submenu1">
                                    <li><NavLink to="/formularioproductos"> + Producto</NavLink></li>
                                    <li><NavLink to="/formulariocategorias"> + Categoría</NavLink></li>
                                    {user?.rol === 1 && <li><NavLink to="/formulariousuarios"> + Usuario</NavLink></li>}
                                </ul>
                            </li>
                            <li><span onClick={()=>logout()}>Cerrar sesión</span></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}