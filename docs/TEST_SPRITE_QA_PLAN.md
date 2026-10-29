# Plan de Pruebas Automatizadas y QA con TestSprite — Buon Appetito

**Fecha:** 29 de Octubre de 2026  
**Proyecto:** Buon Appetito • Port d'Andratx (`web/`)  
**Servidor Objetivo:** `http://localhost:4321`  
**Estado:** PRD Estandarizado y Plan de Pruebas Frontend Generados con Éxito  

---

## 1. Resumen Ejecutivo y Entorno

- **Plataforma de QA:** TestSprite MCP (Integración oficial)
- **Cuenta Vinculada:** Musa Abdul (`mynextbymusa@gmail.com`) — Plan Activo con 146.5 créditos.
- **Rutas Principales Analizadas:**
  - `/` (Home, Historia, Pizze Horno de Leña, Galería Circular WebGL, Reseñas, Horarios y Ubicación)
  - `/carta` (Carta digital interactiva: Antipasti, Pizze, Pasta fresca, Carnes, Dolci, Filtros de alérgenos e i18n)
  - `/vinos` (Bodega seleccionada: Vinos italianos y mallorquines, espumosos, cócteles y notas de maridaje)
  - `/reservar` (Motor de reservas multi-paso: Comensales, calendario interactivo, turno almuerzo/cena, datos de contacto y confirmación)
  - `/aviso-legal`, `/privacidad`, `/cookies` (Páginas legales y de cumplimiento normativo)

---

## 2. Archivos Generados en el Repositorio

Los artefactos del plan de pruebas quedan versionados en `web/testsprite_tests/`:

1. **`code_summary.yaml`** (`web/testsprite_tests/tmp/code_summary.yaml`):  
   Extracción técnica del stack (Astro v7, React 19, Tailwind CSS v4, Lucide Icons, OGL WebGL, Lenis), rutas navegables y especificación de interacciones de usuario.
2. **`standard_prd.json`** (`web/testsprite_tests/standard_prd.json`):  
   PRD formal estandarizado con descripción del producto, objetivos troncales y flujos de usuario detallados.
3. **`testsprite_frontend_test_plan.json`** (`web/testsprite_tests/testsprite_frontend_test_plan.json`):  
   Plan maestro con **24 casos de prueba automatizados** detallados paso a paso (acciones y aserciones).

---

## 3. Cobertura del Plan de Pruebas Frontend (24 Casos)

### A. Motor de Reservas Interactivo (`/reservar`) — [Prioridad ALTA]
- **TC001 [Alta]**: *Complete a reservation end to end*  
  Flujo completo de reserva: selección de comensales, fecha en calendario, preferencia de zona (terraza/sala), turno de servicio, contacto y verificación de confirmación visual.
- **TC002 [Alta]**: *Complete a reservation with all required details*  
  Validación de resumen completo enviado y renderizado del estado confirmado.
- **TC004 [Alta]**: *Preserve reservation progress while switching languages*  
  Comprobación de que al cambiar de idioma (ES/EN/DE) no se pierden los datos seleccionados del formulario.
- **TC006 [Alta]**: *Select a reservation date and available time slot*  
  Verificación de fechas no pasadas y selección granular de franjas horarias (almuerzo/cena).
- **TC009 [Alta]**: *Require policy acceptance before completing a reservation*  
  Validación de obligatoriedad de aceptación de política de reserva previa a la confirmación.
- **TC013 [Alta]**: *Switch the reservation language without losing entered details*  
  Consistencia de datos reactivos durante el cambio multilingüe.
- **TC020 [Media]**: *Show validation feedback for invalid contact details*  
  Detección de errores en campos requeridos (nombre, email y teléfono).

### B. Landing Page y Experiencia de Marca (`/`) — [Prioridad ALTA]
- **TC003 [Alta]**: *Explore the homepage and start a reservation*  
  Navegación por el Hero y activación del CTA de reserva directa hacia `/reservar`.
- **TC005 [Alta]**: *Complete a reservation after exploring the homepage*  
  Flujo combinado de descubrimiento en Home y conversión en Reservas.
- **TC010 [Alta]**: *Browse the homepage navigation and open the menu page*  
  Comprobación de enlaces de navegación principal y acceso fluido a `/carta`.
- **TC011 [Alta]**: *Keep homepage navigation accessible while switching site language*  
  Accesibilidad del menú de navegación durante la conmutación de idioma.

### C. Carta Digital y Alérgenos (`/carta`) — [Prioridad ALTA]
- **TC007 [Alta]**: *Browse the food menu categories and inspect a dish*  
  Exploración de categorías (Antipasti, Pizze, Pastas, Dolci), precios y notas dietéticas/alérgenos.
- **TC012 [Alta]**: *Reserve a table from the food menu*  
  Verificación de CTAs integrados en la carta para pasar directamente a reservar mesa.
- **TC014 [Alta]**: *Browse the food menu and open reservation from the menu*  
  Transición fluida sin pérdida de estado.
- **TC016 [Alta]**: *Switch the food menu language and keep browsing*  
  Comprobación de traducciones en tiempo real para platos y descripciones (ES/EN/DE).
- **TC019 [Media]**: *Return to the homepage from the food menu*  
  Botón de retorno ágil y navegación al home.

### D. Bodega de Vinos y Coctelería (`/vinos`) — [Prioridad ALTA / MEDIA]
- **TC008 [Alta]**: *Browse the wine list and inspect pairing details*  
  Exploración de variedades de uva, procedencia (Mallorca / Italia DOCG) y maridaje recomendado.
- **TC015 [Alta]**: *Jump from the wine list to reservations*  
  Flujo de conversión hacia reserva tras consultar la bodega.
- **TC017 [Alta]**: *Browse the wine list and reach reservations from the cellar pages*  
  Enlace directo al motor de reservas.
- **TC018 [Media]**: *Switch the wine list language while browsing*  
  Traducción de denominaciones y notas de cata.
- **TC021 [Media]**: *Return to the homepage from the wine list*  
  Retorno seguro al portal principal.

### E. Cumplimiento Legal y Políticas — [Prioridad BAJA]
- **TC022 [Baja]**: *Read the legal notice page (`/aviso-legal`)*
- **TC023 [Baja]**: *Read the privacy policy page (`/privacidad`)*
- **TC024 [Baja]**: *Read the cookie policy page (`/cookies`)*

---

## 4. Instrucciones para la Ejecución de Pruebas

Para ejecutar las pruebas en TestSprite:
1. Mantener el servidor local activo: `http://localhost:4321` (o en modo producción con `npm run build && npm run preview`).
2. Invocar la herramienta `testsprite_generate_code_and_execute` seleccionando los IDs deseados o todo el suite:
   ```json
   {
     "projectName": "web",
     "projectPath": "/Users/musa/Documents/W-boun apeptito v1/web",
     "serverMode": "development"
   }
   ```
3. TestSprite generará el código Playwright/E2E correspondiente, ejecutará los tests en el túnel seguro contra `localhost:4321` y emitirá el reporte de resultados y dashboard.
