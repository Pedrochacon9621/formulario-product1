import { FormCategorias } from "../componentes/FormCategorias";
import { Nav } from "../componentes/Nav";
import { Footer } from "../componentes/Footer";
export function FormularioCategorias() {
    return(
        <div>
            <Nav/>
            <div className="main1">
                <div>
                    <FormCategorias/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}