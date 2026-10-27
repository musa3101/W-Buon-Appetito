# Roadmap del Proyecto — Buon Appetito

## 1. Tareas Completadas

* [x] **Internacionalización Trilingüe Adaptativa (`ES` · `EN` · `DE`) con `/i18nstack`:**
  * Diccionario tipado centralizado (`web/src/data/translations.ts`) con traducción cuidada para hostelería de alto nivel en Port d'Andratx.
  * Motor reactivo `window.setBuonLanguage` con persistencia en `localStorage` (`buon_appetito_lang`), cero saltos de recarga y sincronización entre selector `ES · EN · DE` de header y cajón móvil.
  * Traducción íntegra de: Header, Mobile Drawer, Hero Liquid Buttons, Sobre Nosotros, Il Nostro Calzone (infografía de 3 puntos), Menú (ShimmerButtons y toast), Reseñas de Google, Panel de Dónde Estamos y Contacto, y Footer completo con avisos legales.
  * Protección total contra rotura de diseño o desbordamientos por expansión de caracteres en alemán e inglés.

* [x] **Hero Cinemático & Atmósfera Arko:**
  * Metraje de vídeo en bucle continuo (`Hero_Andratx_V3_A_Web.mp4`) sin saltos de reproducción.
  * Tipografía editorial *Cormorant Garamond* y *Questrial*.
  * Botones de cristal líquido translúcido (*Reservar mesa* y *Ver menú*).
  * Reducción de la altura del header fijo en móvil durante el scroll.

* [x] **Separadores de Sección (Fusión España-Italia):**
  * Componente `SectionDivider.astro` con cinta bicolor degradada y estrella toscana de 4 puntas en medallón circular.
  * Instalado entre todas las secciones a partir de *Sobre Nosotros* y en el cajón móvil (`MobileMenu.astro`).

* [x] **Sistema de Botones Interactivos (ShimmerButton de 21st.dev):**
  * Botones de Menú (*Carta de Comida* y *Vinos y Bodega* con toast explicativo).
  * Botones de Reseñas (*Escribir reseña* y *Ver opiniones en Google Maps*).
  * Botón de Contacto (*Reservar Mesa* en verde bosque con icono y flecha).

* [x] **Tipografía y Lectura en «Sobre Nosotros»:**
  * Letra *General Sans* (`font-medium`) con alto contraste `#1A1D1A` y estadísticas en verde bosque `#183321`.
  * Galería circular 3D WebGL con la foto destacada de Aymeric Laporte.

* [x] **Reseñas Verificadas de Google Maps:**
  * Sello editorial con animación interactiva (`0.0 → 4.4`, `+240 opiniones` y estrellas doradas escalonadas).
  * Carrusel táctil y visor modal de fotos de clientes.

* [x] **Panel de Contacto & Dónde Estamos:**
  * Cuadrícula responsive optimizada (2 columnas en móvil, 3 en escritorio) con dígitos en Cabinet Grotesk.
  * Mapa panorámico interactivo con botón directo a Google Maps.

* [x] **Auditoría Técnica y Compilación:**
  * Compilación estática limpia (`npm run build`) en < 650 ms, con 0 errores y validada para Cloudflare Pages.

---

## 2. Tareas en Progreso / Próxima Sesión

* [ ] Integración final de la plantilla pulida de reservas desde `X/reserva/` hacia la ruta `/reservar` de la web.
* [ ] Sustitución del vídeo del Hero por el metraje final en alta definición de Port d'Andratx.
* [ ] Actualización de precios pendientes en la carta digital gastronómica.
* [ ] Incorporación de la nueva carta completa de vinos y bodega.

---

## 3. Próximas Mejoras Prioritarias

1. **Cartas en PDF:** Enlazar los archivos PDF descargables finales cuando estén maquetados.
2. **Dominio Personalizado:** Conectar el dominio oficial definitivo en Cloudflare Pages.
3. **Métricas de «Sobre Nosotros»:** Evaluar sustitución de las métricas (`Km 0`, `1ª`, `100%`) por una dedicatoria familiar de Buon Appetito.
