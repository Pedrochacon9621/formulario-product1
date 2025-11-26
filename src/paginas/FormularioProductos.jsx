import { FormProductos } from "../componentes/FormProductos"
import { Nav } from "../componentes/Nav"
import { Footer } from "../componentes/Footer";
import { BotonEnlace } from "../componentes/BotonEnlace";
export function FormularioProductos() {
    return(
        <div>
            <Nav/>
            <div className="main1">
                <div className="main-center">
                    <BotonEnlace url="/productos" texto="Ver productos"/>
                    <FormProductos/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}