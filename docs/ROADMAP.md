# Roadmap del Proyecto — Buon Appetito

## 1. Tareas Completadas

* [x] **Motor de Reservas Oficial con Identidad Nexoo (`/reservar`):**
  * Integración completa de la marca Nexoo ("Con la tecnología de Nexoo" con soporte ES / EN / DE y enlace a `mynextbymusa.com`).
  * Inclusión del isotipo oficial de Nexoo (tenedor y cuchara en "N") en el footer y favicon oficial en la pestaña.
  * Proporciones móviles compactas y estilizadas para personas, fechas, turnos y horas exactas.
  * Curvaturas suaves de 8px e iconos vectoriales finos (perfil de comensal, calendario limpio y reloj de agujas).
  * Solución al doble tap y zoom no deseado en Safari/Chrome móvil con `touch-action: manipulation;`.
  * Mensaje de WhatsApp simplificado, ejecutivo y con emojis mínimos esenciales (`👤`, `📞`, `✉️`).
  * Aviso de confianza limpio: "✓ Sin intermediarios ni comisiones" y línea divisoria del footer nítida (`1.5px solid #2A2D2A`).
  * Rutas absolutas para assets compatibles al 100% con Cloudflare Pages y subida a ramas `dev` y `main`.

* [x] **Internacionalización Trilingüe Integral (`ES` · `EN` · `DE`) con `/i18nstack`:**
  * Traducción completa en toda la web: Cabecera, Navegación, Menú Móvil, Hero, Sobre Nosotros, La Nostra Pizza, Carrusel de Menú, Reseñas, Dónde Estamos y Footer.
  * Traducción reactiva de los 21 platos del carrusel polaroid de la Home (`PolaroidLineCarousel.tsx`) en los 3 idiomas sin tocar la carta gastronómica.
  * Corrección oficial del plato #12: renombrado a **Pizza Rúcula** (*Pizza Rúcula* en ES/EN, *Pizza Rucola* en DE).
  * Redacción jurídica completa y oficial para todas las páginas legales (`/aviso-legal` con Impressum en alemán, `/privacidad` con Datenschutzerklärung y `/cookies` con Cookie-Richtlinie).
  * Selector de idiomas del footer con contraste óptimo verde bosque `#183321`.

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

* [x] **Auditoría Técnica y Despliegue:**
  * Compilación estática limpia (`npm run build`) en Astro con 0 errores.
  * Ramas `dev` y `main` sincronizadas y desplegadas en GitHub y Cloudflare.

---

## 2. Tareas en Progreso

* [ ] Sustitución del vídeo del Hero por el metraje final en alta definición de Port d'Andratx cuando se entregue el archivo.
* [ ] Incorporación de la carta de vinos y bodega física en sala o PDF descargable.

---

## 3. Próximas Mejoras Prioritarias

1. **Dominio Personalizado:** Configurar y asociar el dominio definitivo de producción en Cloudflare Pages.
2. **SEO y Metadatos Multilingües:** Añadir etiquetas `hreflang` automáticas para optimizar el posicionamiento en Google España, Reino Unido y Alemania.
