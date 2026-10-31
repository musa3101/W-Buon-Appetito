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
- [x] Rediseño V2 Mobile-First del panel de administración (`/admin`):
  - Tarjetas limpias en lista sin conmutadores de disponibilidad en primer plano.
  - Bloqueo de doble toque zoom en iOS Safari (`touch-action: manipulation`).
  - Modal para añadir comida, bebidas o vinos con selector de carta segmentado y categorías dinámicas.
  - Pantalla completa de Ajustes con guía PWA visual e historial de cambios con fecha y hora exacta.
- [x] Auditoría técnica completa Mobile-First: 0 desbordamientos horizontales en todas las rutas y base de datos protegida.
- [x] Integración de reservas con Bavoli:
  - Enlaces de "Ver Menú" y "Reservar Mesa" del Hero con scroll suave a `#menu` y `#donde-estamos`.
  - Botón oficial en Dónde Estamos conectado a `https://www.bavoli.com/book/buon-appetito` en pestaña independiente.
- [x] Optimización de rendimiento con principios Vercel React Best Practices (`client:visible`, `lazy state init`, `passive listeners`).
- [x] Solución integral de vídeo Hero para Desktop y Tablet:
  - Vídeo 16:9 con fondo atmosférico panorámico nítido al 100% en ordenadores y tablets.
  - Unificación de fuente única que elimina el botón de play nativo de Safari.
  - Vídeo vertical nativo 9:16 preservado intacto en móviles.
- [x] Barra de navegación editorial refinada en Desktop:
  - Eliminación de cápsulas y píldoras artificiales.
  - Subrayado dinámico scroll-spy en dorado italiano `#E8C547`.
  - Selector de idioma en texto plano desplegable suavemente hacia la izquierda.
- [x] Perfeccionamiento de la infografía "Il Nostro Calzone": arcos simétricos y orientados con precisión en escritorio y tablet sin tocar móvil.
- [x] Fusión autorizada de rama `dev` a `main` y sincronización con GitHub.

---

## Tareas en progreso
- [ ] Verificación de despliegue en producción (`https://restaurantebuonappetito.pages.dev`).

---

## Próximas mejoras prioritarias
1. **Comprobación en sala con código QR real impreso.**
2. **SEO local y metadatos Schema.org (`Restaurant`, `Menu`).**
