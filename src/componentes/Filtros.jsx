import { useForm } from "react-hook-form"
import { useState, useEffect, useRef } from "react";
import { todosCategorias, filtrarProducto } from "../api/api";
export function Filtros({onFiltrar}) {
    const [categorias, setCategorias] = useState([])
    const [mostrarFiltros, setMostrarFiltros] = useState(false); // para la muestra del componente filtros
    const filtrosRef = useRef(null);// para la muestra del componente filtros
    // useEffect para la muestra del componente filtros:
    useEffect(() => {
        function handleClickOutside(event) {
        if (filtrosRef.current && !filtrosRef.current.contains(event.target)) {
            setMostrarFiltros(false);
        }
        }
        if (mostrarFiltros) {
        document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mostrarFiltros]);
  
    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            precio_prod: 150, // valor inicial igual al máximo
        },
    })
    const precioActual = watch("precio_prod"); // 50 es el valor inicial
    useEffect(()=>{
        async function cargarCategorias() {
            const res = await todosCategorias()
            setCategorias(res.data)
        }
        cargarCategorias()
    },[])
    const onSubmit = handleSubmit(async data =>{
        const res = await filtrarProducto(data)
        
        if (onFiltrar) {
            onFiltrar(res); // actualiza el estado en el padre
        }
    })
    return(
        <div className="contentBTNyComp">
            <span className="p-filtrar" onClick={() => setMostrarFiltros((prev) => !prev)}>Filtrar</span>

            {mostrarFiltros && (
                <div className="contentFiltros compFiltros" ref={filtrosRef}>
                        <form onSubmit={onSubmit}>
                            <h4>Categorias:</h4>
                            {categorias.map(categoria =>(
                                <div className="inputFiltros" key={categoria.id_cat}>
                                    <input  type="radio" id={categoria.id_cat} value={categoria.id_cat} {...register("categoria_prod",{required:false})} />
                                    <label htmlFor={categoria.id_cat}>{categoria.nombre_cat}</label>
                                </div>
                            ))}
                                
                            <div style={{marginTop:"10px", display:"flex", flexDirection:"column"}}>
                                <label htmlFor="precio_prod">Precio máximo: <strong> {precioActual}€</strong></label>
                                <input  style={{}} type="range" tabIndex={0} {...register("precio_prod")} min="0" max="150" step="1"/>
                            </div>
                            <div>
                                <button className="btnFiltros" type="submit">Buscar</button>
                            </div>                    
                        </form>
                </div>
            )}
        </div>
    )
}