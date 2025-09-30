import { Link } from "react-router-dom";

export function BotonEnlace({url, texto}) {
    return(
        <>
            <div className="content-btnEnlace">
                <Link className="btn-enlace1" to={url}>{texto}</Link>
            </div>
        </>
    )
    
}