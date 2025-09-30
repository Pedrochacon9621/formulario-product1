import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { guardarProducto, todosCategorias } from "../api/api";

export function FormProductos() {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function cargarCategorias() {
            const resCategorias = await todosCategorias();
            setCategorias(resCategorias.data);
            if (resCategorias.data.length > 0) {
                setValue("categoria_prod", String(resCategorias.data[0].id_cat));
            }
        }
        cargarCategorias();
    }, [setValue]);

    const onSubmit = handleSubmit(async producto => {
        const formData = new FormData();
        formData.append("nombre_prod", producto.nombre_prod);
        formData.append("descripcion_prod", producto.descripcion_prod);
        formData.append("precio_prod", producto.precio_prod);
        formData.append("disponible", producto.disponible ? "true" : "false");
        formData.append("tiempo_preparacion", producto.tiempo_preparacion);
        formData.append("destacado", producto.destacado ? "true" : "false");
        formData.append("categoria_prod", producto.categoria_prod);
        if (producto.img_prod) {
            formData.append("img_prod", producto.img_prod);
        }

        try {
            await guardarProducto(formData);
            alert("Producto guardado correctamente");
            reset(); // ← limpia el formulario
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Hubo un error al guardar el producto");
        }
    });

    return (
        <div>
            <div className="content-form">
                <form className="form1" onSubmit={onSubmit}>
                    <div className="form1-item">
                        <label htmlFor="nombre_prod">Nombre del producto</label>
                        <input type="text" id="nombre_prod" {...register("nombre_prod", { required: "--campo obligatorio--" })} />
                        {errors.nombre_prod && <p style={{ color: "red" }}>{errors.nombre_prod.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="img_prod">Imagen del Producto</label>
                        <input id="img_prod" className="inputFile" type="file" onChange={(e) => setValue("img_prod", e.target.files[0])} />
                    </div>
                    <div className="form1-item">
                        <label htmlFor="descripcion_prod">Descripción del producto</label>
                        <textarea id="descripcion_prod" {...register("descripcion_prod", { required: false })}></textarea>
                    </div>
                    <div className="form1-item">
                        <label htmlFor="precio_prod">Precio</label>
                        <input id="precio_prod" type="text" {...register("precio_prod", { required: "--campo obligatorio--" })} />
                        {errors.precio_prod && <p style={{ color: "red" }}>{errors.precio_prod.message}</p>}
                    </div>
                    <div className="form1-itemCheck">
                        <label htmlFor="disponible">Disponible</label>
                        <input id="disponible" type="checkbox" {...register("disponible", { required: false })} />
                    </div>
                    <div className="form1-item">
                        <label htmlFor="tiempo_preparacion">Tiempo de preparación</label>
                        <input id="tiempo_preparacion" type="number" {...register("tiempo_preparacion", { required: false })} />
                    </div>
                    <div className="form1-itemCheck">
                        <label htmlFor="destacado">Destacado</label>
                        <input id="destacado" type="checkbox" {...register("destacado", { required: false })} />
                    </div>
                    <div className="form1-item">
                        <label htmlFor="categoria_prod">Categoría del producto</label>
                        <select id="categoria_prod" {...register("categoria_prod", { required: false })}>
                            {categorias.map(categoria => (
                                <option key={categoria.id_cat} value={categoria.id_cat}>
                                    {categoria.nombre_cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button className="form1-btn" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
