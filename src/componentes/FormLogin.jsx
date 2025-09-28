import { useForm } from 'react-hook-form'
import { login } from '../api/api'
import { useUser } from '../context/UserContext'
export function FormLogin() {
    const {refreshUser}=useUser() // ← accede a la función del contexto

    const {register, handleSubmit, formState:{errors} }= useForm()
    const onSubmit = handleSubmit(async usuario =>{
       await login (usuario)
       await refreshUser()
    })
    return(
        <div>
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
                        <button className="form1-btn" type="submit">Iniciar sesión</button>
                    </div>
                </form>
            </div>
        </div>
    )
}