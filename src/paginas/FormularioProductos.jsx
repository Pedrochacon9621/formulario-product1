import { FormProductos } from "../componentes/FormProductos"
import { Nav } from "../componentes/Nav"
import { Footer } from "../componentes/Footer";
export function FormularioProductos() {
    return(
        <div>
            <Nav/>
            <div className="main1">
                <div>
                    <FormProductos/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}