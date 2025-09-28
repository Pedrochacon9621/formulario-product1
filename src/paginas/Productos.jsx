import { TablaProductos } from "../componentes/TablaProductos"
import { Nav } from "../componentes/Nav"
import { Footer } from "../componentes/Footer"

export function Productos() {
    return (
        <div>
            <Nav/>
            <div className="main1">
                <TablaProductos/>
            </div>
            <Footer/>
        </div>
    )
}