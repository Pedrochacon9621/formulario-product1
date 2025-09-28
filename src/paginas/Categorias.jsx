import { Footer } from "../componentes/Footer";
import { Nav } from "../componentes/Nav";
import { TablaCategorias } from "../componentes/TablaCategorias";

export function Categorias() {
    return(
        <div>
            <Nav/>
            <div className="main1">
                <TablaCategorias/>
            </div>
            <Footer/>
        </div>
        
    )
}