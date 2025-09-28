import { useForm } from "react-hook-form"
import { guardarCategoria } from "../api/api"
export function FormCategorias() {
    const {register, handleSubmit, setValue, reset, formState:{errors}} = useForm()
    //enviar formulario:
    const onSubmit = handleSubmit(async categoria=>{
        await guardarCategoria(categoria);
    })
    return(
        <div>
            <div className="content-form">
                <form className="form1" onSubmit={onSubmit}>
                    <div className="form1-item">
                        <label htmlFor="nombre_cat">Nombre de la categoria</label>
                        <input type="text"  id="nombre_cat" {...register("nombre_cat",{required:"--campo obligatorio--"})}/>
                        {errors.nombre_cat && <p style={{color:"red"}}>{errors.nombre_cat.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="descripcion_cat">Descripción de la categoria</label>
                        <textarea name="" id="descripcion_cat" {...register("descripcion_cat",{required:false})}></textarea>
                    </div>
                    <div>
                        <button className="form1-btn" type="submit">Guardar</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
    
}