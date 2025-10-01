import { FormCategorias } from "../componentes/FormCategorias";
import { Nav } from "../componentes/Nav";
import { Footer } from "../componentes/Footer";
import { BotonEnlace } from "../componentes/BotonEnlace";
export function FormularioCategorias() {
    return(
        <div className="principal1">
            <Nav/>
            <div className="main1">
                <div>
                    <BotonEnlace url="/categorias" texto="Ver categorías"/>
                    <FormCategorias/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}