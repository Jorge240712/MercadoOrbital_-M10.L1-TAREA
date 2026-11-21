// Ya viene listo. Un select para elegir a qué servidor se le pide el catálogo (solo para el Extra).
// Recibe la url actual y una función para cambiarla; el efecto de App hace el resto.
function PanelPruebas({ url, onCambiarUrl }) {
    return (
        <div className="panel-pruebas">
            <label>
                Servidor de pruebas
                <select value={url} onChange={(e) => onCambiarUrl(e.target.value)}>
                    <option value="/api/productos.json">Servidor normal</option>
                    <option value="/api/productos-vacio.json">Almacén sin stock</option>
                    <option value="/api/productos-roto.json">Servidor caído</option>
                </select>
            </label>
        </div>
    );
}

export default PanelPruebas;
