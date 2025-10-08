import { useEffect, useState } from "react"
import { todosCategorias, actualizarCategoria, eliminarCategoria } from "../api/api"
import { useForm } from "react-hook-form"
import { useUser } from "../context/UserContext"
export function TablaCategorias() {
     const {user} = useUser()
    const {register, handleSubmit, reset, formState: { dirtyFields }}= useForm();

    const [categorias, setCategorias]= useState([])
    const [editandoId, setEditandoId] = useState(null); //para declarar la fila a editar
    async function cargarCategorias() {
        const res = await todosCategorias()
        setCategorias(res.data)
    }
    useEffect(()=>{
        cargarCategorias()
    },[])

    const onSubmit = async (data) => {
        // Creamos un objeto con solo los campos modificados
        const datosActualizados = {};
        for (let key in dirtyFields) {
            datosActualizados[key] = data[key];
        }
        await actualizarCategoria(editandoId, datosActualizados); // PATCH directo con JSON
        await cargarCategorias(); // Refresca la tabla
        setEditandoId(null);      // Salimos del modo edición
    };
    async function btnEliminarCategoria(id_cat) {
        const confirmar = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirmar) return;
        await eliminarCategoria(id_cat);
        await cargarCategorias(); // ← refresca la tabla
    }
    return(
        <div className="content-tabla1"> 
            <table>
                <thead>
                    <tr className="tr1">
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(categoria=>(
                        <tr key={categoria.id_cat}>
                            {editandoId === categoria.id_cat ?(
                                // Modo edición: mostramos inputs
                                <>
                                <td><input {...register("nombre_cat")} /></td>
                                <td><input {...register("descripcion_cat")} /></td>
                                <td>
                                    <div className="contentBtn-tabla1">
                                        <span className="span-tabla1" onClick={handleSubmit(onSubmit)}><img src="icons/save2.png" alt="save" title="guardar" /></span>
                                        <span className="span-tabla1" onClick={() => setEditandoId(null)}><img src="icons/cancel2.png" alt="cancel" title="cancelar"/></span>
                                    </div> 
                                </td>
                                </>
                            ):(
                                // Modo visual: mostramos datos normales
                                <>
                                    <td>{categoria.nombre_cat}</td>
                                    <td>{categoria.descripcion_cat}</td>
                                    <td>
                                        {/* Activamos modo edición y cargamos valores en el formulario */}
                                            <div className="contentBtn-tabla1">
                                                <span className="span-tabla1" onClick={() => {
                                                    reset(categoria); // carga valores actuales en el form
                                                    setEditandoId(categoria.id_cat); // activa modo edición
                                                }}><img src="icons/lapiz.png" alt="editar" title="editar"/></span>
                                                {user?.rol === 1 && <span className="span-tabla1" onClick={()=>btnEliminarCategoria(categoria.id_cat)}><img src="icons/basura.png" alt="eliminar" title="eliminar"/></span>}
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