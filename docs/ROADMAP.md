# Roadmap del Proyecto — Buon Appetito

## 1. Tareas Completadas

* [x] **Internacionalización Trilingüe Integral (`ES` · `EN` · `DE`) con `/i18nstack`:**
  * Traducción completa y adaptada culturalmente en toda la web: Cabecera, Navegación, Menú Móvil, Hero, Sobre Nosotros, La Nostra Pizza, Carrusel de Menú, Reseñas, Dónde Estamos y Footer.
  * Traducción reactiva de los 21 platos del carrusel polaroid de la Home (`PolaroidLineCarousel.tsx`) en los 3 idiomas sin tocar la carta gastronómica.
  * Corrección oficial del plato #12: renombrado a **Pizza Rúcula** (*Pizza Rúcula* en ES/EN, *Pizza Rucola* en DE).
  * Redacción jurídica completa y oficial para todas las páginas legales (`/aviso-legal` con Impressum en alemán, `/privacidad` con Datenschutzerklärung y `/cookies` con Cookie-Richtlinie).
  * Corrección visual del selector de idiomas en el pie de página (contraste óptimo verde bosque `#183321` sobre fondo claro).

* [x] **Motor de Reservas Estilo Cappuccino (`/reservar`):**
  * Chips cuadrados 1–5 y selector dinámico `...` para grupos.
  * Selector de fechas vivas y turnos de Comida y Cena con acordeón de horas exactas.
  * Selector de espacio (*Terraza Puerto* y *Salón Interior*) y ocasiones especiales.
  * Confirmación inteligente a WhatsApp directo (móvil) o modal Web/Email (ordenador/tablet).
  * Multiidioma sincronizado (`ES`, `EN`, `DE`) guardado en `localStorage`.

* [x] **Optimización de Pantalla Completa y Bloqueo en Loaders (Safari iOS):**
  * Eliminación del hueco inferior mediante extensión `100lvh + 200px` y `bottom: -200px`.
  * Congelación total del fondo (`opacity: 0 !important; visibility: hidden !important;`) durante la animación.
  * Navegación limpia al inicio y apertura de reservas en la misma pestaña.

* [x] **Hero Cinemático & Atmósfera Arko:**
  * Vídeo en bucle continuo con gradientes ambientales.
  * Tipografía editorial Cormorant Garamond y Questrial.
  * Botones translúcidos de cristal líquido (Liquid Glass).

* [x] **Separadores de Sección Bicolor Ítalo-Españoles:**
  * Componente `SectionDivider` con medallón de estrella toscana en todas las secciones clave.

* [x] **Reseñas Verificadas de Google Maps:**
  * Sello dinámico `4.4` con estrellas doradas y `+240 opiniones`.
  * Carrusel de opiniones y visor modal de fotos de clientes.

* [x] **Auditoría Técnica y Compilación:**
  * Compilación estática limpia (`npm run build`) en 608 ms con 0 errores.
  * Verificación en vivo con Google Chrome DevTools (CDP).

---

## 2. Tareas en Progreso

* [ ] Sustitución del vídeo del Hero por el metraje final en alta definición de Port d'Andratx cuando se entregue el archivo.
* [ ] Incorporación de la carta de vinos y bodega física en sala o PDF descargable.

---

## 3. Próximas Mejoras Prioritarias

1. **Dominio Personalizado:** Configurar y asociar el dominio definitivo de producción en Cloudflare Pages.
2. **SEO y Metadatos Multilingües:** Añadir etiquetas `hreflang` automáticas para optimizar el posicionamiento en Google España, Reino Unido y Alemania.
