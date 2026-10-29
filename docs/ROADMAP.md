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
- [x] Rediseño ultra-minimalista del panel `/admin` (estilo Apple / Shopify, sin sobrecarga ni tecnicismos).
- [x] Estados directos simplificados: únicamente «Disponible» y «No disponible».
- [x] Botón visual de sincronización instantánea (`🔄 Sincronizado ✓`).
- [x] Corrección integral del login para evitar desbordes visuales.
- [x] Asistente de traducción automática por IA con edición manual libre multiidioma.
- [x] Sincronización en tiempo real de `/carta` y `/vinos` con la base de datos y fallback offline.
- [x] Sincronización completa entre `X/INSFORGE/index.html` y `web/src/pages/admin.astro`.

---

## Tareas en progreso
- [ ] Comprobación por parte de Musa en su teléfono móvil con las credenciales (`buonappetitoandratx@gmail.com` / `admin`).
- [ ] Prueba de añadir o modificar un plato desde el móvil y verificar su reflejo instantáneo en la carta web.

---

## Próximas mejoras prioritarias
1. **Verificación en sala**:
   - Comprobar la respuesta de cambio de precio y plato agotado desde la mesa con un código QR real.
2. **Despliegue a producción**:
   - Merge de la rama `dev` a `main` y despliegue final en Cloudflare Pages con variables de entorno de producción.
3. **SEO local y metadatos**:
   - Datos estructurados Schema.org (`Restaurant`, `Menu`) para indexación en Google Maps y búsquedas locales.
