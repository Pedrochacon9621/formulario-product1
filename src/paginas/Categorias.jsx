import { BotonEnlace } from "../componentes/BotonEnlace";
import { Footer } from "../componentes/Footer";
import { Nav } from "../componentes/Nav";
import { TablaCategorias } from "../componentes/TablaCategorias";

export function Categorias() {
    return(
        <div>
            <Nav/>
            <div className="main1">
                <div className="main-center">
                    <BotonEnlace url="/formulariocategorias" texto="+ Añadir nuevo"/>
                    <TablaCategorias/>
                </div>
            </div>
            <Footer/>
        </div>
        
    )
}