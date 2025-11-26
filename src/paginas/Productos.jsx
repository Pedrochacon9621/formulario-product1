import { TablaProductos } from "../componentes/TablaProductos"
import { Nav } from "../componentes/Nav"
import { Footer } from "../componentes/Footer"
import { BotonEnlace } from "../componentes/BotonEnlace"

export function Productos() {
    return (
        <div>
            <Nav/>
            <div className="main1">
                <div className="main-center">
                    <BotonEnlace url="/formularioproductos" texto="+ Añadir nuevo"/>
                    <TablaProductos/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}