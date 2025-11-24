import { useForm } from "react-hook-form"
import { buscarProducto } from "../api/api"
import { useLocation } from "react-router-dom"
export function BarraBusqueda({onResultados}) {
    const location = useLocation()
    const {register, handleSubmit} = useForm()

    // Extraer el primer segmento después de "/"
    const pathSegments = location.pathname.split("/");
    const primerSegmento = pathSegments[1]; // "categorias" o "productos"
    const URLbusqueda = primerSegmento; // ya lo tienes en una const


    const onSubmit = handleSubmit(async data =>{
        const resBusqueda = await buscarProducto(data, URLbusqueda)
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