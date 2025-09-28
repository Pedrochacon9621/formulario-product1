import { useForm } from "react-hook-form"
import { guardarUsuario } from "../api/api"
import { todosRol } from "../api/api"
import { useEffect, useState } from "react"

export function FormUsuarios() {
    const [roles, setRoles]=useState([])
    const {register, handleSubmit, setValue, formState:{errors}} = useForm()
    useEffect(()=>{
        async function cargarRoles() {
            const res = await todosRol()
            setRoles(res.data)
            // Establecer valor por defecto dinámicamente
            if (res.data.length > 0) {
                setValue("rol", String(res.data[1].id_rol)); // ← asegúrate que sea string
            }
        }
        cargarRoles()
    },[])
     
     //enviar formulario:
    const onSubmit = handleSubmit(async usuario=>{
        await guardarUsuario(usuario);
    })
    return(
        <div>
            <div className="content-form">
                <form className="form1" onSubmit={onSubmit}>
                    <div className="form1-item">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text"  id="username" {...register("username",{required:"--campo obligatorio--"})}/>
                        {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"  id="password" {...register("password",{required:"--campo obligatorio--"})}/>
                        {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="first_name">Nombre</label>
                        <input type="text"  id="first_name" {...register("first_name",{required:"--campo obligatorio--"})}/>
                        {errors.first_name && <p style={{color:"red"}}>{errors.first_name.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="last_name">Apellido</label>
                        <input type="text"  id="last_name" {...register("last_name",{required:"--campo obligatorio--"})}/>
                        {errors.last_name && <p style={{color:"red"}}>{errors.last_name.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email"  id="email" {...register("email",{required:false})}/>
                    </div>
                   <div className="form1-item">
                        <label htmlFor="rol">Rol</label>
                        <select name="" id="rol" {...register("rol",{required:false})}>
                            {roles.map(rol=>(
                                <option value={rol.id_rol}>{rol.nombre_rol}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button className="form1-btn" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}