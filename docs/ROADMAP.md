# Roadmap del Proyecto — Buon Appetito

## 1. Tareas Completadas

* [x] **Arquitectura y Proyecto Base:**
  * Proyecto web desarrollado en Astro con Tailwind CSS v4 y React integrado en `web/`.
  * Tokens de diseño editorial: verde oliva (`#183321`), terracota cálido (`#9E4221`) y marfil claro (`#FBF9F5`).
  * Tipografías de alta gama (*Playfair Display* y *Plus Jakarta Sans*).

* [x] **Componentes Modulares de la Web:**
  * `Header.astro`: Barra flotante translúcida con transición suave al hacer scroll.
  * `MobileMenu.astro`: Menú lateral editorial para móviles con bloqueo estricto del scroll de fondo.
  * `Hero.astro`: Titular en 2 líneas y botones estilo cristal esmerilado (*"Reservar mesa"* y *"Nuestra carta"*).
  * `About.astro`: Historia del restaurante y galería circular 3D interactiva en WebGL con shaders OGL y visor Lightbox.
  * `LaNostraPizza.astro`: Infografía artesanal con pizza central y flechas vectoriales SVG hechas a mano.
  * `Reviews.astro`: Carrusel interactivo estilo polaroid con fotos reales y sello oficial de Google Maps 4.9 estrellas.
  * `LocationReservations.astro`: Formulario de reservas directo por WhatsApp (con protección anti-zoom para iPhone) y mapa de Google Maps con botón "CÓMO LLEGAR".
  * `Footer.astro`: Pie de página oscuro elegante con sello *BA Est. 1998* y créditos MYNEXT vinculados.

* [x] **Páginas Independientes:**
  * Páginas legales conforme al RGPD: Aviso Legal (`/aviso-legal`), Cookies (`/cookies`) y Privacidad (`/privacidad`).
  * Página dedicada para reservas (`/reservar`).

* [x] **Auditoría Forense y Carta Digital (Menú 105 ítems):**
  * Validación del 100% de las correcciones de Google Gemini y auditoría independiente frente al PDF original.
  * Extracción y generación del dataset maestro oficial `CORREGUIDO MENU.docx` (105 platos en Español, Inglés y Alemán).
  * Aplicación interactiva de la carta digital en `menu carta:estudio/carta-digital/` con diseño de carta editorial (sin cajas cuadradas ni píldoras pesadas).

* [x] **Validación y Repositorio en GitHub:**
  * Compilación estática completada con 0 errores (`npm run build`).
  * Repositorio remoto `musa3101/W-baa` sincronizado en GitHub con las ramas `dev` y `main`.

---

## 2. Tareas en Progreso

* [ ] Verificación de despliegue automático en el panel de Cloudflare Pages a través del repositorio de GitHub.

---

## 3. Próximas Mejoras Prioritarias

1. **Integración de la Carta Digital:** Incorporar la sección de la carta digital interactiva en la web principal (para la próxima sesión).
2. **Fotografía Gastronómica Definitiva:** Sustituir imágenes provisionales restantes por fotos de alta resolución de las pizzas y platos del restaurante.
3. **Cartas en PDF:** Enlazar los archivos PDF descargables finales cuando estén maquetados.
4. **Dominio Personalizado:** Configurar el dominio oficial en Cloudflare Pages con certificado SSL activo.
