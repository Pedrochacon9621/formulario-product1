import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FormLogin } from "../componentes/FormLogin";

export function Inicio() {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate("/productos");
        }
    }, [loading, user, navigate]);

    if (loading) {
        return (
            <div className="modal-loading">
                <div className="modal-content">
                    <p>Verificando sesión...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='mainL'>
                <div>
                    <FormLogin />
                </div>
            </div>
        </div>
    );
}