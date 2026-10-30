# Hoja de Ruta (Roadmap) - Buon Appetito

## Tareas completadas
- [x] Backend cloud en InsForge permanente (105 platos en 3 idiomas).
- [x] Sincronización en vivo de `/carta` y `/vinos` con la base de datos.
- [x] Despliegue en producción con dominio limpio: `https://restaurantebuonappetito.pages.dev`.
- [x] Acceso seguro sin contraseñas en texto plano y conmutador para ver/ocultar clave.
- [x] Persistencia de sesión indefinida ("Recordar mi cuenta") para Web App móvil.
- [x] Configuración Web App instalable (PWA) para iPhone y Android (`manifest.webmanifest`).
- [x] Separación de la carta en 3 cartas independientes: Comida (71), Bebidas (34) y Bodega de Vinos.
- [x] Barra de navegación inferior móvil táctil (Bottom Navigation Bar) adaptada al uso con el pulgar.
- [x] Cajón de Perfil & Ajustes Obsidian Luxury Sheet (`#0B0E14`) con pantalla completa en móvil y safe areas en iPhone.
- [x] Rediseño integral del panel de administración a **Opción 2: Vibrant Neo-Bento Light** (`#F8FAFC` titanium), abandonando los tonos crema antiguos y el fondo negro pesado.
- [x] Código de colores Bento por secciones ("cuadros de cada color"): Menta Fresco (Comida / Precios), Ámbar Solar (Bebidas / Disponibilidad), Violeta Eléctrico (Bodega / Textos e IA) y Cielo Azul (Categorías / Perfil).
- [x] Nuevo **Neo-Bento Studio** para Añadir y Editar Platos:
  - Sin el bloque de foto grande intrusivo.
  - Cuadro 1 (Precio Hero Esmeralda) con píldoras de ajuste rápido (+0.50€, +1.00€, etc.).
  - Cuadro 2 (Categoría Zafiro) con selector de chips táctiles dinámicos.
  - Cuadro 3 (Disponibilidad en Cocina Ámbar/Neón) con switch iOS grande y badge explicativo.
  - Cuadro 4 (Textos & IA Violeta) con selector de idiomas segmentado y traducción automática.
  - Guardado rápido dual (cabecera superior y barra fija inferior).
- [x] Paneles a **pantalla completa real** en móviles (`<= 768px`, 100% width, 100dvh, border-radius: 0) sin efecto "mini-ventana".
- [x] Bloqueo total de desplazamiento del fondo (`lockBackgroundScroll`) evitando cualquier movimiento de la carta al abrir paneles.
- [x] Corrección de excepción en listeners de JavaScript (`btnCancelModal`) y optimización táctil a latencia cero (0 ms).

- [x] Fusión de rama `dev` a `main` y despliegue automatizado en Cloudflare Pages.

---

## Tareas en progreso
- [ ] Verificación de despliegue en producción (`https://restaurantebuonappetito.pages.dev/admin`).

---

## Próximas mejoras prioritarias
1. **Comprobación en sala con código QR real impreso.**
2. **SEO local y metadatos Schema.org (`Restaurant`, `Menu`).**
