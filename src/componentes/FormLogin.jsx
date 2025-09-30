import { useForm } from 'react-hook-form'
import { login } from '../api/api'
import { useUser } from '../context/UserContext'
import { useState } from 'react'
export function FormLogin() {
    const {refreshUser}=useUser() // ← accede a la función del contexto
    const [loading, setLoading] = useState(false); // ← nuevo estado 

    const {register, handleSubmit, formState:{errors} }= useForm()
    const onSubmit = handleSubmit(async usuario =>{
        setLoading(true);
        try {
            await login(usuario); // ← tu función que llama al backend
            await refreshUser();
        } catch (error) {
            console.error("Error de login:", error);
            alert("Usuario o contraseña incorrectos");
        } finally {
            setLoading(false);
        }

    })
    return(
        <div>
            {loading && (
                <div className="modal-loading">
                    <div className="modal-content">
                        <p>Cargando...</p>
                    </div>
                </div>
            )}

            <div className="content-form">
                <form className="form1" onSubmit={onSubmit}>
                    <div className="form1-item">
                        <label htmlFor="username">Usuario</label>
                        <input id='username' type="text" {...register("username", {required:"--campo obligatorio--"})}/>
                        {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="password">Contraseña</label>
                        <input id='password' type="password" {...register("password", {required:"--campo obligatorio--"})}/>
                        {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
                    </div>
                    <div>
                        <button className="form1-btn" type="submit" disabled={loading}>{loading ? "Cargando..." : "Iniciar sesión"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}