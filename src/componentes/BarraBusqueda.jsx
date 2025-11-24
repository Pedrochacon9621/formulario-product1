import { useForm } from "react-hook-form"
import { buscarProducto, filtrarProducto, todosProductos } from "../api/api"
export function BarraBusqueda({onResultados}) {
    
    const {register, handleSubmit} = useForm()
    const onSubmit = handleSubmit(async data =>{
        const resBusqueda = await buscarProducto(data)
         if (onResultados){
            onResultados(resBusqueda)
         }
    })

    return(
        <>
            <form onSubmit={onSubmit}>
                <input style={{margin:"0", padding:"0 10px"}} type="search"{...register("busqueda")}/>
                <button type="submit" className="btn-barraBusqueda">Buscar</button>
            </form>
        </>
    )
}