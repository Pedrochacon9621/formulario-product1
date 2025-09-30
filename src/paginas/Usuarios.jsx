import { TablaUsuarios } from "../componentes/TablaUsuarios";
import { Nav } from "../componentes/Nav";
import { Footer } from "../componentes/Footer";
import { useUser } from "../context/UserContext";
import { BotonEnlace } from "../componentes/BotonEnlace";
export function Usuarios() {
    const { user, loading } = useUser();

  if (loading) return <p>Cargando...</p>;
  if (!user || user.rol !== 1) return null;

    return(
        <div>
            <Nav/>
                <div className="main1">
                    <div>
                        <BotonEnlace url="/formulariousuarios" texto="+ Añadir nuevo"/>
                        <TablaUsuarios/>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}