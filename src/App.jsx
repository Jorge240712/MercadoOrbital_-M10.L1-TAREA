import { useState, useEffect } from "react";
import Encabezado from "./components/Encabezado.jsx";
import Catalogo from "./components/Catalogo.jsx";
import PanelCarrito from "./components/PanelCarrito.jsx";
import Aviso from "./components/Aviso.jsx";
import OfertaRelampago from "./components/OfertaRelampago.jsx";
import FichaProducto from "./components/FichaProducto.jsx";
// Extra: descomenta esta línea cuando llegues al Extra para curiosos
import PanelPruebas from "./components/PanelPruebas.jsx";

// El catálogo ya no vive en src/data/productos.js: lo publica el servidor de la estación en esta URL.
// Para probar error y vacío, cámbiala por "/api/productos-roto.json" o "/api/productos-vacio.json".
const URL_CATALOGO = "/api/productos.json";

function App() {
    // Estado de la tienda (ya viene listo)
    const [carrito, setCarrito] = useState([]);
    const [aviso, setAviso] = useState("");
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const [fichaId, setFichaId] = useState(null);
    const [url, setUrl] = useState(URL_CATALOGO);

    // ===== Ticket 1 · El catálogo llega del servidor =====
    // TODO 1.1 · Los tres estados nuevos ya están declarados. Revisa el valor inicial de cada uno:
    //   productos arranca en [] porque en el primer render la respuesta todavía no existe.
    //   cargando arranca en true porque el pedido sale apenas aparece App.
    //   error arranca en "" porque todavía no falló nada.
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // Carga el catálogo y conserva el error para mostrarlo si falla la petición.
    async function cargarCatalogo() {
        setCargando(true);
        setError("");

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);

            const datos = await response.json();
            setProductos(datos);
        } catch (e) {
            setError(e.message);
        } finally {
            setCargando(false);
        }
    }

    // TODO 1.3 · El pedido sale una sola vez, cuando App aparece: un useEffect con [] que llama a cargarCatalogo().
    //   Ojo: el efecto NO es async. Solo llama a la función.
    useEffect(() => { cargarCatalogo(); }, [url]);
    // ===== fin Ticket 1 =====

    // Valores calculados a partir del carrito (ya vienen listos)
    const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    // Si el producto ya está en el carrito, le sube la cantidad; si no, lo agrega con cantidad 1
    function agregarAlCarrito(producto) {
        const yaEsta = carrito.some((item) => item.id === producto.id);

        if (yaEsta) {
            setCarrito(carrito.map((item) =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }

        setAviso(`Agregaste ${producto.nombre} al carrito`);
    }

    function quitarDelCarrito(id) {
        setCarrito(carrito.filter((item) => item.id !== id));
    }

    // ===== INICIO · L1, Ticket 1 =====
    // La pestaña muestra cuántas unidades hay en el carrito
    useEffect(() => {
        document.title = `(${totalUnidades}) Mercado Orbital`;
    }, [totalUnidades]);
    // ===== FIN · L1, Ticket 1 =====

    // ===== INICIO · L1, Ticket 2 =====
    // El aviso se borra solo a los 2,5 segundos
    useEffect(() => {
        if (aviso === "") return;

        const id = setTimeout(() => {
            setAviso("");
        }, 2500);

        return () => clearTimeout(id);
    }, [aviso]);
    // ===== FIN · L1, Ticket 2 =====

    // ===== INICIO · L1, Ticket 3 =====
    // La tecla Escape cierra el panel del carrito
    useEffect(() => {
        function manejarTecla(e) {
            if (e.key === "Escape") {
                setCarritoAbierto(false);
            }
        }

        window.addEventListener("keydown", manejarTecla);

        return () => window.removeEventListener("keydown", manejarTecla);
    }, []);
    // ===== FIN · L1, Ticket 3 =====

    // ===== INICIO · L1, Extra =====
    // La tecla C abre y cierra el carrito. Lee carritoAbierto, así que va en el arreglo
    useEffect(() => {
        function alternarConC(e) {
            if (e.key === "c" || e.key === "C") {
                setCarritoAbierto(!carritoAbierto);
            }
        }

        window.addEventListener("keydown", alternarConC);

        return () => window.removeEventListener("keydown", alternarConC);
    }, [carritoAbierto]);
    // ===== FIN · L1, Extra =====

    return (
        <div className="app">
            <Encabezado
                totalUnidades={totalUnidades}
                onAbrirCarrito={() => setCarritoAbierto(true)}
            />

            <section className="bienvenida">
                <img src="/img/nova-tienda.png" alt="Nova en el mostrador del Mercado Orbital" />
                <div>
                    <h2>Bienvenido al puesto de Nova</h2>
                    <p>Repuestos revisados uno por uno en el hangar. Si algo falla, Kuma lo arregla.</p>
                </div>
            </section>

            {/* L1, Tarea, Ticket 1 */}
            <OfertaRelampago />

            {/* Extra: aquí va <PanelPruebas url={url} onCambiarUrl={setUrl} /> */}
            <PanelPruebas url={url} onCambiarUrl={setUrl} />

            {/* Ticket 1 · Catalogo recibe los tres estados y la función para reintentar (Ticket 3) */}
            <Catalogo
                productos={productos}
                cargando={cargando}
                error={error}
                onReintentar={cargarCatalogo}
                onAgregar={agregarAlCarrito}
                onVerFicha={setFichaId}
            />

            <Aviso mensaje={aviso} />

            {fichaId !== null && (
                <FichaProducto
                    id={fichaId}
                    producto={productos.find((producto) => producto.id === fichaId)}
                    onAgregar={agregarAlCarrito}
                    onCerrar={() => setFichaId(null)}
                />
            )}

            {carritoAbierto && (
                <PanelCarrito
                    items={carrito}
                    total={totalPrecio}
                    onCerrar={() => setCarritoAbierto(false)}
                    onQuitar={quitarDelCarrito}
                />
            )}
        </div>
    );
}

export default App;
