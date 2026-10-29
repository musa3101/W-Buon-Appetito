# Hoja de Ruta (Roadmap) - Buon Appetito

## Tareas completadas
- [x] Corrección de autoplay del vídeo Hero en Safari iOS y eliminación de poster estático.
- [x] Animación del botón hamburguesa convertida a CSS nativo suave.
- [x] Header con activación retardada y transición orgánica al nivel de los botones del Hero.
- [x] Fijación permanente del color verde corporativo `#183321` en Safari iOS.
- [x] Altura de Hero en móvil calibrada para portada limpia sin filtración de la siguiente sección.
- [x] Difuminación doble de «Sobre nosotros» (fusión orgánica desde el Hero hasta el fondo crema).
- [x] Separadores de sección continuos con Rama de Olivo Silvestre.
- [x] Auditoría de diseño responsive y UX (tablets, áreas táctiles $\ge 44\text{ px}$, CLS del logo).
- [x] Backend cloud en InsForge configurado permanentemente sin apagado por inactividad.
- [x] Migración SQL de tablas de carta, categorías y vinos con políticas RLS de seguridad.
- [x] Carga de 8 categorías y 105 platos en 3 idiomas (ES, EN, DE).
- [x] Verificación de coherencia al 100% entre `menu_corregido_extraido.txt`, `menu.json` y la base de datos InsForge.
- [x] Rediseño editorial del panel `/admin` en formato de lista agrupada por secciones.
- [x] Eliminación total del concepto y etiquetas de «Disponible / No disponible».
- [x] Apertura directa del editor al pulsar cualquier fila de plato.
- [x] Botón visual de sincronización instantánea (`🔄 Sincronizado ✓`).
- [x] Tabla de historial y panel emergente de «Registro de cambios» (`menu_logs`).
- [x] Sincronización en tiempo real de `/carta` y `/vinos` con la base de datos y fallback offline.
- [x] Sincronización completa entre `X/INSFORGE/index.html` y `web/src/pages/admin.astro`.

---

## Tareas en progreso
- [ ] Verificación de Musa en móvil o navegador del nuevo listado agrupado y del botón «Registro».

---

## Próximas mejoras prioritarias
1. **Verificación en sala**:
   - Comprobar la respuesta de edición de platos desde la mesa con un código QR real.
2. **Despliegue a producción**:
   - Merge de la rama `dev` a `main` y despliegue final en Cloudflare Pages con variables de entorno de producción.
3. **SEO local y metadatos**:
   - Datos estructurados Schema.org (`Restaurant`, `Menu`) para indexación en Google Maps y búsquedas locales.
