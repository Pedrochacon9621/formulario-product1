import { useForm } from "react-hook-form";
import { guardarCategoria } from "../api/api";

export function FormCategorias() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async categoria => {
        try {
            await guardarCategoria(categoria);
            alert("Registro guardado correctamente");
            reset(); // ← limpia el formulario
        } catch (error) {
            console.error("Error al guardar categoría:", error);
            alert("Hubo un error al guardar el registro");
        }
    });

    return (
        <div>
            <div className="content-form">
                <form className="form1" onSubmit={onSubmit}>
                    <div className="form1-item">
                        <label htmlFor="nombre_cat">Nombre de la categoría</label>
                        <input
                            type="text"
                            id="nombre_cat"
                            {...register("nombre_cat", { required: "--campo obligatorio--" })}
                        />
                        {errors.nombre_cat && <p style={{ color: "red" }}>{errors.nombre_cat.message}</p>}
                    </div>
                    <div className="form1-item">
                        <label htmlFor="descripcion_cat">Descripción de la categoría</label>
                        <textarea
                            id="descripcion_cat"
                            {...register("descripcion_cat", { required: false })}
                        ></textarea>
                    </div>
                    <div>
                        <button className="form1-btn" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
