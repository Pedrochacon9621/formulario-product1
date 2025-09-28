import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { actualizarUsuario, todosUsuariosRol,todosRol, eliminarUsuario } from "../api/api";
import { useUser } from "../context/UserContext";
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
        cargarRoles()
        cargarUsuarios()
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
    return (
        <div className="content-tabla1"> 
            <table>
                <thead>
                    <tr className="tr1">
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo electrónico</th>
                        <th>rol</th>
                        <th>Acciones</th>
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
                                        <button className="btn-tabla1" onClick={handleSubmit(onSubmit)}>Guardar</button>
                                        <button className="btn-tabla1" onClick={() => setEditandoId(null)}>Cancelar</button>
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
                                                <button className="btn-tabla1" onClick={() => {
                                                    reset(usuario); // carga valores actuales en el form
                                                    setValue("rol", String(usuario.rol.id_rol)); // ← fuerza el valor del select
                                                    setEditandoId(usuario.id); // activa modo edición
                                                }}>Editar</button>
                                                {user?.rol === 1 && <button className="btn-tabla1" onClick={()=>btnEliminarUsuario(usuario.id)}>Eliminar</button>}
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