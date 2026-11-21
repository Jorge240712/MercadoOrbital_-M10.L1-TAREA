import { existsSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Servidor de la estación: hace que /api/ tarde casi un segundo, como un servidor real. No lo toques.
// Si el archivo pedido no existe en public/api/, responde 404 (Vite solo devolvería el index.html).
function servidorEstacion() {
    return {
        name: "servidor-estacion",
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (!req.url.startsWith("/api/")) {
                    next();
                    return;
                }

                const ruta = req.url.split("?")[0];
                const existe = existsSync(join(server.config.publicDir, ruta));

                setTimeout(() => {
                    if (existe) {
                        next();
                        return;
                    }

                    // Texto plano, como la página de 404 de un servidor real: response.json() no lo puede leer
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/plain; charset=utf-8");
                    res.end(`404 - No existe ${ruta} en el servidor de la estación`);
                }, 900);
            });
        },
    };
}

export default defineConfig({
    plugins: [react(), servidorEstacion()],
});
