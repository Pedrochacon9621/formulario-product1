import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { todosProductos, actualizarProducto, eliminarProducto } from "../api/api";
import { useUser } from "../context/UserContext";

export function TablaProductos() {
  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/do1we5kur/";
  function obtenerUrlImagen(ruta) {
  if (!ruta) return null;
  return ruta.startsWith("http")
    ? ruta
    : `${CLOUDINARY_BASE_URL}${ruta}`;
}

  const {user}=useUser()
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);//para declarar la fila a editar

  // useForm con acceso a dirtyFields para saber qué campos fueron modificados
  const {register, handleSubmit, reset, formState: { dirtyFields }} = useForm();

  // Cargar productos al montar el componente
    async function cargarProductos() {
      const res = await todosProductos();
      setProductos(res.data);
    }  
  useEffect(() => {
    cargarProductos();
    
  }, []);

  // Enviar solo los campos modificados
  const onSubmit = async (data) => {
    const formData = new FormData();
    // Recorremos solo los campos que fueron modificados
    for (let key in dirtyFields) {
      if (key === "img_prod") {
        // Si hay imagen nueva, la agregamos
        if (data.img_prod && data.img_prod[0]) {
          formData.append("img_prod", data.img_prod[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    // Enviamos PATCH al backend con solo los campos modificados
    await actualizarProducto(editandoId, formData);
    await cargarProductos(); // Recarga los productos actualizados
    setEditandoId(null);     //  Salimos del modo edición
  };
  async function btnEliminarProducto(id_prod) {
    const confirmar = window.confirm("¿Está seguro de eliminar el registro?");
    if (!confirmar) return;
    await eliminarProducto(id_prod)
    await cargarProductos()
  }

  return (
    <div className="content-tabla1">
      <table>
        <thead>
          <tr className="tr1">
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>Disponible</th>
            <th>Tiempo preparación</th>
            <th>Destacado</th>
            <th>Creado</th>
            <th>Modificado</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_prod}>
              {editandoId === producto.id_prod ? (
                // Modo edición: mostramos inputs
                <>
                  <td><input {...register("nombre_prod")} defaultValue={producto.nombre_prod}/></td>
                  <td><input {...register("descripcion_prod")} defaultValue={producto.descripcion_prod}/></td>
                  <td><input type="number" step="0.01" {...register("precio_prod")} defaultValue={producto.precio_prod}/></td>
                  <td><input {...register("categoria_prod")} defaultValue={producto.categoria_prod}/></td>
                  <td><select {...register("disponible")}>
                      <option value={true}>Sí</option>
                      <option value={false}>No</option>
                    </select>
                  </td>
                  <td><input type="number" {...register("tiempo_preparacion")} defaultValue={producto.tiempo_preparacion}/></td>
                  <td>
                    <select {...register("destacado")}>
                      <option value={true}>Sí</option>
                      <option value={false}>No</option>
                    </select>
                  </td>
                  <td>{producto.fecha_creacion_prod}</td>
                  <td>{producto.fecha_modificacion_prod}</td>
                  <td>
                    {/* Campo de imagen: solo se envía si el usuario selecciona una nueva */}
                    <input className="inputImg-tabla" type="file" {...register("img_prod")} />
                    <img className="imgTabla1" src={obtenerUrlImagen(producto.img_prod)} alt="" style={{ marginTop: "5px" }}/>
                  </td>
                  <td>
                    <div className="contentBtn-tabla1">
                      <button className="btn-tabla1" onClick={handleSubmit(onSubmit)}>Guardar</button>
                      <button className="btn-tabla1" onClick={() => setEditandoId(null)}>Cancelar</button>
                    </div> 
                  </td>
                </>
              ) : (
                // Modo visual: mostramos datos normales
                <>
                  <td>{producto.nombre_prod}</td>
                  <td>{producto.descripcion_prod}</td>
                  <td>{producto.precio_prod}</td>
                  <td>{producto.categoria_prod}</td>
                  <td>{producto.disponible ? "Sí" : "No"}</td>
                  <td>{producto.tiempo_preparacion}</td>
                  <td>{producto.destacado ? "Sí" : "No"}</td>
                  <td>{producto.fecha_creacion_prod}</td>
                  <td>{producto.fecha_modificacion_prod}</td>
                  <td>
                    <img className="imgTabla1" src={obtenerUrlImagen(producto.img_prod)} alt="" />
                  </td>
                  <td>
                    {/* Activamos modo edición y cargamos valores en el formulario */}
                    <div className="contentBtn-tabla1">
                      <button className="btn-tabla1" onClick={() => {
                          reset(producto); // carga valores actuales en el form
                          setEditandoId(producto.id_prod); // activa modo edición
                        }}>Editar</button>
                      {user?.rol === 1 && <button className="btn-tabla1" onClick={()=>btnEliminarProducto(producto.id_prod)}>Eliminar</button>}
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
