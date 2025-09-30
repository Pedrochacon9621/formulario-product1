import { FormUsuarios } from "../componentes/FormUsuarios";
import { Nav } from "../componentes/Nav";
import { Footer } from "../componentes/Footer";
import { useUser } from "../context/UserContext";
import { BotonEnlace } from "../componentes/BotonEnlace";

export function FormularioUsuarios() {
    const { user, loading } = useUser();

  if (loading) return <p>Cargando...</p>;
  if (!user || user.rol !== 1) return null;
    return(
        <div>
             <Nav/>
            <div className="main1">
                <div>
                    <BotonEnlace url="/usuarios" texto="Ver usuarios"/>
                    <FormUsuarios/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}