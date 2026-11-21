<div align="center">

```
   +---------------------------+
   | FICHA TECNICA        [ X ]|
   |---------------------------|
   | Motor de iones            |
   | Fabricante: Forja Orbital |
   | Naves compatibles: 3      |
   | Stock: 4                  |
   +---------------------------+
```

# 🛰️ Mercado Orbital 2.0

### 📋 Ticket MO-202 · Home Challenge: Ficha técnica

![Puntos](https://img.shields.io/badge/valor-15%20puntos-2EA44F?style=for-the-badge)
![Tiempo](https://img.shields.io/badge/tiempo-1%20hora-FF9800?style=for-the-badge)
![Entrega](https://img.shields.io/badge/entrega-link%20de%20GitHub%20en%20Notion-0A66C2?style=for-the-badge&logo=github&logoColor=white)

<img src="assets/nova-musica.gif" width="380" alt="Nova leyendo un manual con audífonos mientras Kuma duerme">

</div>

---

## 🚀 Misión

> 👩‍🚀 **Nova:** Los clientes preguntan lo mismo todo el día: quién fabrica el repuesto, en qué nave entra y cuántos quedan. Quiero un botón en cada tarjeta que abra la ficha y la traiga fresca del almacén.

Los clientes de Nova quieren saber más de cada repuesto antes de comprarlo: quién lo fabrica, para qué naves sirve y cuántas unidades quedan. El almacén central ya publica una ficha por producto en `/api/fichas/<id>.json` (el kit de la clase trae esos archivos en `public/api/fichas/` y los estilos de la ficha en `App.css`).

Sigues en tu **Mercado Orbital 2.0** de la clase, con los Tickets 1 a 4 de MO-201 resueltos. No se crea un proyecto nuevo. Abre `http://localhost:5173/api/fichas/1.json` para ver qué trae una ficha: `id`, `nombre`, `fabricante`, `descripcion`, `compatibilidad` (lista) y `stock`.

```
Tarjeta [Ver ficha] --onVerFicha(id)--> App (fichaId) --> FichaProducto --fetch--> /api/fichas/id.json
```

## 🏆 Tablero de puntos

| Ticket | Qué haces | Puntos |
| --- | --- | :---: |
| 1️⃣ | Botón Ver ficha | 🟢 4 |
| 2️⃣ | La ficha pide sus datos | 🟡 6 |
| 3️⃣ | Cargando y error en la ficha | 🟠 5 |
| 🌟 | Extra para curiosos | ⭐ 0 |
| | **Total** | **15** |

---

## 🎫 Tickets

### 1️⃣ Ticket 1 · Botón Ver ficha (4 puntos)

📄 Archivos: `src/components/TarjetaProducto.jsx` y `src/App.jsx`.

1. `TarjetaProducto` recibe una prop nueva, `onVerFicha`, y muestra un botón "Ver ficha" con la clase `boton-ficha`. Al tocarlo llama `onVerFicha(producto.id)`.
2. `Catalogo` recibe `onVerFicha` desde `App` y se la pasa a cada `TarjetaProducto`.
3. En `App`, estado nuevo `fichaId`, que arranca en `null`. Al tocar "Ver ficha" guarda el id; al cerrar vuelve a `null`.
4. En el JSX de `App`:
   `{fichaId !== null && <FichaProducto id={fichaId} onCerrar={() => setFichaId(null)} />}`

**🏁 Listo cuando:**

- [ ] Cada tarjeta tiene el botón.
- [ ] Al tocarlo aparece la ficha (aunque todavía esté vacía o solo muestre el id).

### 2️⃣ Ticket 2 · La ficha pide sus datos (6 puntos)

📄 Archivo nuevo: `src/components/FichaProducto.jsx`.

1. Recibe `{ id, onCerrar }`.
2. Estado `ficha`, que arranca en `null`.
3. `async function cargarFicha()` que pide `/api/fichas/${id}.json`, hace `response.json()` y guarda el resultado con `setFicha`.
4. `useEffect` que llama a `cargarFicha()` y depende de `[id]`: si cambia el id, la ficha se vuelve a pedir.
5. Muestra nombre, fabricante, descripción, compatibilidad (una lista `<ul>`) y stock.
6. Se cierra con el botón "Cerrar" y al tocar el fondo oscuro. Reutiliza las clases del carrito: `fondo-panel` afuera, `panel ficha` adentro, `ficha-cabeza` para el título y el botón, `ficha-dato` para cada dato. Acuérdate del `stopPropagation` del `PanelCarrito`.

**🏁 Listo cuando:**

- [ ] Al tocar "Ver ficha" en el Motor de iones aparece la ficha con "Forja Orbital Vega", la descripción, tres naves y stock 4.
- [ ] Cerrar y fondo cierran.

> [!TIP]
> El efecto depende de `[id]`, no de `[]`: la ficha puede abrirse con otro producto sin desmontarse.

### 3️⃣ Ticket 3 · Cargando y error en la ficha (5 puntos)

📄 Archivo: `src/components/FichaProducto.jsx`.

1. Estados propios de la ficha: `cargando` (arranca en `true`) y `error` (arranca en `""`). Son de la ficha, no los de `App`.
2. En `cargarFicha`: `setCargando(true)` y `setError("")` al inicio, `try / catch / finally`, `if (!response.ok) throw new Error(...)`, `setError(e.message)` en el `catch`, `setCargando(false)` en el `finally`.
3. Mientras carga, la ficha muestra el texto "Cargando ficha...". Si falló, muestra el mensaje de error. Si todo salió bien, los datos.

**🏁 Listo cuando:**

- [ ] Al abrir una ficha se ve "Cargando ficha..." casi un segundo y luego los datos.
- [ ] Para probar el error, en `App` cambia un momento `id={fichaId}` por `id={99}`: debe mostrar `El servidor respondió 404`.
- [ ] Vuelves a dejarlo como estaba antes de entregar.

> [!WARNING]
> La consola también muestra en rojo `Failed to load resource: ... 404`: es el navegador avisando del 404, no un error de tu código.

### 🌟 Extra para curiosos (sin puntos)

La ficha tiene su propio botón "Agregar al carrito" que llama a `agregarAlCarrito` con el producto del catálogo. Para eso `App` le pasa a `FichaProducto` dos props más: `onAgregar={agregarAlCarrito}` y `producto` (el del catálogo con ese id, búscalo con `productos.find`). Si `ficha.stock === 0`, la ficha muestra la etiqueta "Agotado" (clase `agotado`) y el botón va `disabled`. Pruébalo con el Cristal Bit.

---

## 💡 Pistas

- 🔁 Los pasos son los mismos de la clase, pero dentro de un componente pequeño: estados, función `async`, efecto, `return` tempranos.
- 🎯 El efecto depende de `[id]`, no de `[]`: la ficha puede abrirse con otro producto sin desmontarse.
- 🛡️ Mientras `ficha` es `null` no intentes pintar `ficha.nombre`. En el Ticket 2 protégelo con `ficha !== null &&` (o un `return` temprano); desde el Ticket 3, el de cargando ya lo cubre.

## 📤 Cómo entregar

1. Sube los cambios a tu repositorio de GitHub del Mercado Orbital (`git add .`, `git commit -m "MO-202 ficha técnica"`, `git push`).
2. Pega el link del repositorio en la entrega de Notion de esta semana.
3. Deja `URL_CATALOGO` en `/api/productos.json` y la ficha con `id={fichaId}` antes de subir.

## 📊 Criterios

| Ticket | Qué se revisa | Puntos |
| --- | --- | --- |
| Ticket 1 · Botón Ver ficha | `TarjetaProducto` recibe `onVerFicha` y tiene un botón "Ver ficha" con clase `boton-ficha` que llama `onVerFicha(producto.id)`. `App` tiene estado `fichaId` que arranca en `null`, lo llena al tocar el botón y lo vuelve `null` al cerrar. `FichaProducto` se pinta solo cuando `fichaId !== null`. | 4 |
| Ticket 2 · La ficha pide sus datos | Existe `src/components/FichaProducto.jsx` con props `id` y `onCerrar`, estado `ficha` (`null`), `async function cargarFicha()` con `fetch` a `/api/fichas/${id}.json` y `response.json()`, y un `useEffect` con `[id]` que la llama. Muestra nombre, fabricante, descripción, lista de compatibilidad y stock. Cierra con el botón y con el fondo. | 6 |
| Ticket 3 · Cargando y error en la ficha | Estados `cargando` (arranca `true`) y `error` (arranca `""`) dentro de `FichaProducto`. `cargarFicha` usa `try / catch / finally`, revisa `response.ok` y lanza el error con el status, guarda `e.message` en `error` y apaga `cargando` en `finally`. Pinta "Cargando ficha..." mientras carga y el mensaje de error si falla. | 5 |
| **Total** | | **15** |
| Extra (sin puntos) | Botón "Agregar al carrito" dentro de la ficha que llama a `agregarAlCarrito` con el producto. Con `stock === 0` muestra "Agotado" (clase `agotado`) y el botón está `disabled`. Se anota como bonus, no suma puntos. | 0 |

> [!IMPORTANT]
> Se descuenta hasta 2 puntos si el proyecto no arranca con `pnpm dev` o si quedaron errores en la consola al abrir una ficha.
