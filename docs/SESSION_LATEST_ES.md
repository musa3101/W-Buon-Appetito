# Resumen de Sesión — Buon Appetito

**Fecha:** 25 de Octubre de 2026  
**Rama:** `dev` → `main`  
**Proyecto:** Web Oficial Buon Appetito (Port d'Andratx, Mallorca)  

---

### ¿Qué se ha hecho hoy?
1. **Configuración del Setup Musa MYNEXT:**
   - Integradas las reglas `AGENTS.md`, `.prettierrc` y utilidades del repositorio `setup-musa-mynext`.
2. **Rediseño editorial del Hero (Estilo Arko):**
   - Eliminado el badge superior innecesario en móvil.
   - Tipografía refinada en 2 líneas equilibradas.
   - Botones estilo cristal translúcido esmerilado Apple (*"Reservar mesa"* y *"Nuestra carta"*).
   - Cabecera con viñeta verde oliva flotante y transición suave a barra compacta de cristal al hacer scroll.
3. **Galería 3D Circular WebGL con OGL en "Sobre Nosotros":**
   - Integrado el componente `CircularGallery` con shaders de ondulación 3D y bordes curvados con SDF antialiasing.
   - Optimizado para móvil con tarjetas proporcionadas (48% de pantalla) y sin textos molestos debajo de las fotos.
   - Autoplay ultra lento y sedoso (velocidad 0.05).
   - Deslizamiento táctil con el dedo y botones discretos `<` y `>` abajo.
   - Modo visor Lightbox: al tocar cualquier foto se abre en grande en pantalla completa y el carrusel se detiene automáticamente.
4. **Integración de fotos reales de Buon Appetito:**
   - Convertidas las fotos originales de iPhone de la carpeta `fotos de sobre nosotros` (`.HEIC` a JPEG optimizado).
   - Orientación 100% vertical y derecha (mesa con vistas al puerto, fachada con olivo y carta física).
5. **Solución definitiva al zoom en iPhone al escribir en reservas:**
   - Corregido el tamaño de fuente de todos los inputs a 16px en móvil y regla CSS global de protección para evitar el auto-zoom forzado de Safari.
6. **Auditoría completa responsive en Desktop y Móvil:**
   - Verificado con herramientas de navegador: 0 errores de consola, 60fps constantes y navegación fluida.

---

### Archivos modificados
- [`src/components/About.astro`](../src/components/About.astro): Integración de la galería 3D y nuevos textos editoriales.
- [`src/components/ui/circular-gallery-2.tsx`](../src/components/ui/circular-gallery-2.tsx): Motor WebGL OGL, escala móvil, tap-to-enlarge y autoplay suave.
- [`src/components/ui/circular-gallery-demo.tsx`](../src/components/ui/circular-gallery-demo.tsx): Carrusel de 10 fotos con visor Lightbox y controles.
- [`src/components/LocationReservations.astro`](../src/components/LocationReservations.astro): Inputs a 16px para evitar auto-zoom en iPhone.
- [`src/components/Hero.astro`](../src/components/Hero.astro): Titular editorial y botones translúcidos.
- [`src/components/Header.astro`](../src/components/Header.astro): Viñeta flotante y transición compacta.
- [`src/styles/global.css`](../src/styles/global.css): Regla CSS global anti-zoom para móviles.
- [`astro.config.mjs`](../astro.config.mjs) y [`tsconfig.json`](../tsconfig.json): Integración de React y alias `@/*`.

---

### Problemas solucionados
- **Auto-zoom de Safari en móvil:** Al pulsar en "Nombre" o "Teléfono", la pantalla hacía zoom y se descuadraba. Solucionado fijando la escala a 16px.
- **Fotos torcidas / apaisadas:** Las fotos de la terraza estaban rotadas 90°. Se corrigió su orientación a totalmente verticales ("paradas") y se evitó la caché de Safari.
- **Sobrecarga visual en la galería:** Eliminados textos redundantes en la cabecera y pie de las fotos para dejar una estética limpia y de alta gama.

---

### ¿Qué queda pendiente?
- Reemplazar imágenes provisionales restantes en "La Nostra Pizza" y "Menú" por fotografías definitivas editadas.
- Enlazar los PDFs descargables reales de la carta cuando estén listos.
- Conectar y verificar el despliegue automático en Cloudflare Pages.
