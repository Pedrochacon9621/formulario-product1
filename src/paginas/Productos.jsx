import { TablaProductos } from "../componentes/TablaProductos"
import { Nav } from "../componentes/Nav"
import { Footer } from "../componentes/Footer"
import { BotonEnlace } from "../componentes/BotonEnlace"

export function Productos() {
    return (
        <div>
            <Nav/>
            <div className="main1">
                <div>
                    <BotonEnlace className="content-btnEnlace2" url="/formularioproductos" texto="+ Añadir nuevo"/>
                    <TablaProductos/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}