import { TablaUsuarios } from "../componentes/TablaUsuarios";
import { Nav } from "../componentes/Nav";
import { Footer } from "../componentes/Footer";
import { useUser } from "../context/UserContext";
export function Usuarios() {
    const { user, loading } = useUser();

  if (loading) return <p>Cargando...</p>;
  if (!user || user.rol !== 1) return null;

    return(
        <div>
            <Nav/>
                <div className="main1">
                    <TablaUsuarios/>
                </div>
            <Footer/>
        </div>
    )
}