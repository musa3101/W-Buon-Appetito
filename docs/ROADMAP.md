# Roadmap del Proyecto — Buon Appetito

## 1. Tareas Completadas

* [x] **Hero Cinemático & Atmósfera Arko:**
  * Metraje de vídeo en bucle continuo (`Hero_Andratx_V3_A_Web.mp4`) con `autoplay`, `loop`, `muted` y `playsinline` *(versión provisional para validar estilo visual y encuadre)*.
  * Tipografía editorial *Cormorant Garamond Light* para el titular y *Questrial* para la ubicación en Port d'Andratx.
  * Botones de cristal líquido 100% transparentes (*Reservar mesa* hacia `/reservar` y *Ver menú* hacia `/carta`).
  * Espaciado amplio y aireado para máxima amplitud del vídeo en móvil y escritorio.
  * Icono de menú hamburguesa animado con 4 líneas escalonadas (*AlignRightIcon*).

* [x] **Transición Verde Oliva & Cabecera «Sobre Nosotros»:**
  * Degradado verde oliva corporativo (`#183321`) sutil a ras de suelo en el pie del Hero, por debajo de los botones.
  * Cabecera editorial sólida verde oliva en `About.astro` empalmando a 0px con el Hero.
  * Titular *«Nuestra Esencia / El placer de compartir una buena mesa»* en marfil y terracota, con paso limpio a la sección crema.
  * Galería circular 3D interactiva en WebGL con la foto destacada de Aymeric Laporte.

* [x] **Header y Navegación Adaptativa:**
  * Fondo ambiental difuminado en reposo que pasa a barra compacta de vidrio esmerilado al hacer scroll.
  * Eliminación de bordes subpixel para suprimir cualquier línea horizontal no deseada.
  * Breakpoint responsive en tablets (`lg:` a 1024px) para evitar aglomeración de enlaces en iPad vertical.

* [x] **Carta Digital & Loaders:**
  * Página completa de Carta Gastronómica (`/carta`) con categorías, alérgenos, fotos y precios.
  * Animación de precarga con temática de pizza artesanal en horno de leña (`PizzaMenuLoader.astro`).

* [x] **Páginas Legales y Fiscales Oficiales:**
  * Datos fiscales reales incorporados: Titular *Buon Apeetito av.24 SL.*, CIF *B26841494*.
  * Páginas de Aviso Legal (`/aviso-legal`), Cookies (`/cookies`), Privacidad (`/privacidad`) y Reservas (`/reservar`).

* [x] **Auditoría Multi-dispositivo Integral:**
  * Auditoría satisfactoria en Móvil (390×844), iPad (768×1024) y Ordenador (1280×900 / 1440×900).
  * 0 errores de consola, sin desbordamiento horizontal y compilación de producción en 540 ms.

---

## 2. Tareas en Progreso / Próxima Sesión

* [ ] Sustitución del vídeo del Hero por el metraje definitivo en alta definición de Port d'Andratx *(el actual es provisional)*.
* [ ] Actualización de precios pendientes en la carta digital gastronómica.
* [ ] Incorporación de la nueva carta completa de vinos y bodega.

---

## 3. Próximas Mejoras Prioritarias

1. **Cartas en PDF:** Enlazar los archivos PDF descargables finales cuando estén maquetados.
2. **Dominio Personalizado:** Conectar el dominio oficial definitivo en Cloudflare Pages.
3. **Métricas de «Sobre Nosotros»:** Evaluar sustitución de las métricas (`Km 0`, `1ª`, `100%`) por una cita o dedicatoria de la familia Buon Appetito.
