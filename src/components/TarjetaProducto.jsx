// Ya viene listo. Pinta un producto y avisa al padre cuando lo agregan.
function TarjetaProducto({ producto, segundos, onAgregar, onVerFicha }) {
    const precio = producto.nombre === "Propulsor turbo" && segundos > 0
        ? 450
        : producto.precio;

    return (
        <article className="tarjeta">
            <img src={producto.imagen} alt={producto.nombre} className="tarjeta-imagen" />
            <span className="etiqueta">{producto.categoria}</span>
            <h3>{producto.nombre}</h3>
            <p className="precio">{precio} cr</p>
            <button
                className="boton-agregar"
                onClick={() => onAgregar({ ...producto, precio })}
            >
                Agregar al carrito
            </button>
            <button
                className="boton-ficha"
                onClick={() => onVerFicha(producto.id)}
            >
                Ver ficha
            </button>
        </article>
    );
}

export default TarjetaProducto;
