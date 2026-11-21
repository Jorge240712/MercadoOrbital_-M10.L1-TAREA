import { useEffect, useState } from "react";

function FichaProducto({ id, producto, onAgregar, onCerrar }) {
    const [ficha, setFicha] = useState(null);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    async function cargarFicha() {
        setFicha(null);
        setError("");
        setCargando(true);

        try {
            const response = await fetch(`/api/fichas/${id}.json`);
            if (!response.ok) {
                throw new Error(`El servidor respondió ${response.status}`);
            }

            const datos = await response.json();
            setFicha(datos);
        } catch (e) {
            setError(e.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarFicha();
    }, [id]);

    return (
        <div className="fondo-panel" onClick={onCerrar}>
            <section className="panel ficha" onClick={(e) => e.stopPropagation()}>
                <div className="ficha-cabeza">
                    <h2>{ficha ? ficha.nombre : "Ficha del producto"}</h2>
                    <button className="boton-cerrar" onClick={onCerrar}>Cerrar</button>
                </div>
                {cargando ? (
                    <p className="ficha-estado">Cargando ficha...</p>
                ) : error ? (
                    <p className="ficha-estado">No se pudo cargar la ficha: {error}</p>
                ) : (
                    <>
                        <div className="ficha-dato">
                            <strong>Fabricante</strong>
                            <p>{ficha.fabricante}</p>
                        </div>
                        <div className="ficha-dato">
                            <strong>Descripción</strong>
                            <p>{ficha.descripcion}</p>
                        </div>
                        <div className="ficha-dato">
                            <strong>Compatibilidad</strong>
                            <ul>
                                {ficha.compatibilidad.map((nave) => (
                                    <li key={nave}>{nave}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="ficha-dato">
                            <strong>Stock</strong>
                            <p>{ficha.stock}</p>
                        </div>
                        {ficha.stock === 0 && <span className="agotado">Agotado</span>}
                        <button
                            className="boton-agregar"
                            onClick={() => onAgregar(producto)}
                            disabled={ficha.stock === 0}
                        >
                            Agregar al carrito
                        </button>
                    </>
                )}
            </section>
        </div>
    );
}

export default FichaProducto;
