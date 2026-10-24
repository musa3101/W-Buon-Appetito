# Roadmap del Proyecto — Buon Appetito

## 1. Tareas Completadas ✅
* [x] Definición conceptual y técnica en [`PLANIFICACION_BUON_APPETITO.md`](../01_fase1_referencias/planificacion_inicial/PLANIFICACION_BUON_APPETITO.md).
* [x] Repositorio de referencia de Arko Restaurant archivado y organizado en [`01_fase1_referencias/refe ARKO`](../01_fase1_referencias/refe%20ARKO).
* [x] Integración de la sección infográfica artesanal "La Nostra Pizza" con llamadas de texto y flechas dibujadas a mano en SVG.
* [x] Reestructuración del flujo de secciones acordada: Inicio → Sobre nosotros → La Nostra Pizza → Menú → Reseñas (Google Maps 4.9★) → Dónde estamos & Reservas (eliminando Amenities/Hospitalidad).
* [x] Boceto interactivo v2 aprobado y preservado en [`boceto_aprobado_v2/boceto_v2.html`](../boceto_aprobado_v2/boceto_v2.html).
* [x] Inicialización del proyecto web en Astro con Tailwind CSS v4 en [`web/`](../web/).
* [x] Modularización completa de los componentes en Astro:
  * [`Header.astro`](../web/src/components/Header.astro) (Header transparente en Hero con transición fluida a verde oliva sólido).
  * [`MobileMenu.astro`](../web/src/components/MobileMenu.astro) (Menú drawer lateral para móviles).
  * [`Hero.astro`](../web/src/components/Hero.astro) (Portada inmersiva con micro-badge).
  * [`About.astro`](../web/src/components/About.astro) (Historia, 48h de fermentación y horno de leña).
  * [`LaNostraPizza.astro`](../web/src/components/LaNostraPizza.astro) (Infografía artesanal con flechas vectoriales SVG).
  * [`Menu.astro`](../web/src/components/Menu.astro) (Platos destacados y llamadas a carta completa en PDF).
  * [`Reviews.astro`](../web/src/components/Reviews.astro) (Insignia oficial Google Maps 4.9★ con testimonios reales).
  * [`LocationReservations.astro`](../web/src/components/LocationReservations.astro) (Formulario interactivo de reserva por WhatsApp + Mapa Google Maps y horarios continuados).
  * [`Footer.astro`](../web/src/components/Footer.astro) (3 columnas equilibradas con sello circular *BA Est. 1998*).
* [x] Verificación de compilación estática (`npx astro build`) y navegación en entorno local sin errores.
* [x] Optimización **Full Responsive Móvil (100%)**:
  * **Header móvil limpio:** Oculta la pastilla de idiomas en la cabecera móvil (`hidden md:inline-flex`), dejando una barra despejada (logo + hamburguesa).
  * **Menú Móvil Drawer Editorial con Bloqueo de Fondo:** Rediseñado con degradado oliva, tipografía editorial, numeración `01`–`04`, botón terracota "RESERVAR MESA" y bloqueo del scroll de fondo (`overflow: hidden` en `html`/`body` y `touch-action: none`).
  * **La Nostra Pizza (Experiencia idéntica a la referencia):** Escenario infográfico móvil con pizza central y flechas vectoriales SVG artesanales (`arrow1.svg`, `arrow2.svg`, `arrow3.svg`, `flash.svg`) y textos integrados directos (adiós a los cuadritos sosos).
  * **Menú y Reseñas en Carrusel Limpio:** Deslizamiento táctil horizontal sin banners de texto innecesarios.
  * **Formulario de reservas ultracompacto:** Fecha y Hora en 2 columnas lado a lado en móvil, inputs compactos y comensales en chips.
* [x] **Subida y sincronización en GitHub**:
  * Repositorio remoto [musa3101/W-baa](https://github.com/musa3101/W-baa) inicializado, sincronizado y subido con éxito en la rama `main`.
  * Estructura lista con `package.json` en la raíz para auto-detección instantánea en Cloudflare Pages.
* [x] Compilación estática comprobada con éxito (`astro build`, 0 errores).

---

## 2. Tareas en Progreso ⏳
* [ ] Conectar y desplegar a Cloudflare Pages (vía panel o Wrangler/Cloudflare MCP).
* [ ] Enlazar los archivos PDF reales de las cartas de comida y vinos.

---

## 3. Próximas Mejoras Prioritarias 🚀
1. **Fotografía definitiva:** Reemplazar imágenes de muestra por fotos de los platos reales del restaurante.
2. **Sistema Multiidioma (i18n):** Implementar conmutación activa de contenidos en inglés y alemán.
3. **Optimización SEO:** Datos estructurados schema.org para tipo `Restaurant` con geolocalización.
4. **Dominio personalizado:** Vincular el dominio oficial `buonappetito.es` en Cloudflare.
