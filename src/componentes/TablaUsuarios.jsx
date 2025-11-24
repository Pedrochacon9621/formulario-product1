import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { actualizarUsuario, todosUsuariosRol,todosRol, eliminarUsuario } from "../api/api";
import { useUser } from "../context/UserContext";
import { BarraBusqueda } from "./BarraBusqueda";
export function TablaUsuarios() {
    const {user, refreshUser} = useUser()
    const {register, handleSubmit, reset, setValue, formState: { dirtyFields }}= useForm();
    const[usuarios, setUsuarios]=useState([])
     const [roles, setRoles]=useState([])
    const [editandoId, setEditandoId] = useState(null); //para declarar la fila a editar
    async function cargarUsuarios() {
        const res = await todosUsuariosRol()
        setUsuarios(res.data)
    }
    useEffect(()=>{
         async function cargarRoles() {
                    const res = await todosRol()
                    setRoles(res.data)
                }
            cargarUsuarios()    
            cargarRoles()
    },[])
    const onSubmit = async (data) => {
            // Creamos un objeto con solo los campos modificados
            const datosActualizados = {};
            for (let key in dirtyFields) {
                datosActualizados[key] = data[key];
            }
            await actualizarUsuario(editandoId, datosActualizados); // PATCH directo con JSON
            await refreshUser();
            await cargarUsuarios(); // Refresca la tabla
            setEditandoId(null);      // Salimos del modo edición
        };
    async function btnEliminarUsuario(id) {
        const confirmar = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirmar) return;
        await eliminarUsuario(id);
        await cargarUsuarios();
    }

    function buscarUsuario(usuariosFiltrados) {
        setUsuarios(usuariosFiltrados)
    }
    return (
        <div className="content-tabla1 ptop-filtro"> 
           <div style={{marginBottom:"7px", display:"flex", justifyContent:"flex-end"}}><BarraBusqueda onResultados={buscarUsuario}/></div>
            <table>
                <thead>
                    <tr className="tr1">
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo electrónico</th>
                        <th>rol</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario=>(
                        <tr key={usuario.id}>
                            {editandoId === usuario.id ?(
                                // Modo edición: mostramos inputs
                                <>
                                <td><input {...register("username")} /></td>
                                <td><input {...register("first_name")} /></td>
                                <td><input {...register("last_name")} /></td>
                                <td><input {...register("email")} /></td>
                                <td>
                                    <select {...register("rol")}>
                                        {roles.map((rol) => (
                                            <option key={rol.id_rol} value={String(rol.id_rol)}>{rol.nombre_rol}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <div className="contentBtn-tabla1">
                                        <span className="span-tabla1" onClick={handleSubmit(onSubmit)}><img src="icons/save2.png" alt="save" title="guardar" /></span>
                                        <span className="span-tabla1" onClick={() => setEditandoId(null)}><img src="icons/cancel2.png" alt="cancel" title="cancelar" /></span>
                                    </div> 
                                </td>
                                </>
                            ):(
                                // Modo visual: mostramos datos normales
                                <>
                                    <td>{usuario.username}</td>
                                    <td>{usuario.first_name}</td>
                                    <td>{usuario.last_name}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.rol.nombre_rol}</td>
                                    <td>
                                        <div className="contentBtn-tabla1">
                                            {/* Activamos modo edición y cargamos valores en el formulario */}
                                                <span className="span-tabla1" onClick={() => {
                                                    reset(usuario); // carga valores actuales en el form
                                                    setValue("rol", String(usuario.rol.id_rol)); // ← fuerza el valor del select
                                                    setEditandoId(usuario.id); // activa modo edición
                                                }}><img src="icons/lapiz.png" alt="editar" title="editar"/></span>
                                                {user?.rol === 1 && <span className="span-tabla1" onClick={()=>btnEliminarUsuario(usuario.id)}><img src="icons/basura.png" alt="eliminar" title="eliminar"/></span>}
                                        </div>
                                    </td>
                                </> 
                            )}
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}