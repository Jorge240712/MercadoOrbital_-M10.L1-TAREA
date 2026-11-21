import Cargando from "./Cargando.jsx";
import ErrorCatalogo from "./ErrorCatalogo.jsx";
import CatalogoVacio from "./CatalogoVacio.jsx";
import TarjetaProducto from "./TarjetaProducto.jsx";

// Pinta uno de los cuatro estados del catálogo: cargando, error, vacío o éxito.
// Los tres return tempranos van en este orden. Si uno gana, la función termina ahí
// y el map de abajo no corre.
function Catalogo({ productos, cargando, error, onReintentar, onAgregar, onVerFicha }) {
    // TODO Ticket 2 · Cargando
    // Si cargando es true, devuelve <Cargando /> y nada más.
    // Una línea: if (...) return ...;
    if (cargando) return <Cargando />;

    // TODO Ticket 3 · Error
    // Si error no es "", devuelve <ErrorCatalogo mensaje={error} onReintentar={onReintentar} />.
    // Va DESPUÉS de cargando: mientras carga no hay error que mostrar.
    if (error !== "") return <ErrorCatalogo mensaje={error} onReintentar={onReintentar} />;

    // TODO Ticket 4 · Vacío
    // Si productos.length es 0, devuelve <CatalogoVacio />.
    // Va DESPUÉS del error: cuando hay error, productos también está en [] y ganaría el mensaje equivocado.
    if (productos.length === 0) return <CatalogoVacio />;

    // Éxito: ya viene listo. Es el mismo map que tenían en App.jsx la semana pasada.
    return (
        <main className="catalogo">
            {productos.map((producto) => (
                <TarjetaProducto
                    key={producto.id}
                    producto={producto}
                    onAgregar={onAgregar}
                    onVerFicha={onVerFicha}
                />
            ))}
        </main>
    );
}

export default Catalogo;
