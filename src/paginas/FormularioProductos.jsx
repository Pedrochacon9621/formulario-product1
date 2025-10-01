import { FormProductos } from "../componentes/FormProductos"
import { Nav } from "../componentes/Nav"
import { Footer } from "../componentes/Footer";
import { BotonEnlace } from "../componentes/BotonEnlace";
export function FormularioProductos() {
    return(
        <div className="principal1">
            <Nav/>
            <div className="main1">
                <div>
                    <BotonEnlace url="/productos" texto="Ver productos"/>
                    <FormProductos/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}