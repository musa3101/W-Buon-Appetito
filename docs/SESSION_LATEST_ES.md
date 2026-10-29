# Registro de Sesión - Buon Appetito Web
**Fecha:** 29 de Octubre de 2026  
**Rama de trabajo:** `dev` (sincronizada y mergeada a `main`)

---

## 1. Qué se ha hecho hoy
1. **Solución definitiva al Hero Video en Safari iPhone**:
   - Eliminación del bloqueo de autoplay causado por atributos estáticos y poster falso.
   - Activación directa con guardián táctil transparente en JavaScript.
2. **Animación fluida del Menú Hamburguesa**:
   - Sustitución de etiquetas SMIL `<animate>` por `@keyframes` CSS nativos ultra-fluidos en iOS.
3. **Calibración del Header en Scroll**:
   - Despejado durante todo el Hero en móvil: permanece transparente hasta que los botones de acción suben a la altura del header.
   - Transición orgánica suave con curva `cubic-bezier(0.25, 1, 0.5, 1)` y duración ampliada a 650ms.
4. **Eliminación del color "verde lima lavado" en Safari**:
   - Configurado `color-scheme: dark light` y blindado el verde corporativo `#183321` en `<html>`, `<body>` y `Preloader.astro` para que los rebotes elásticos de iOS mantengan el color verde botella idéntico al de Sobre Nosotros.
5. **Ajuste de pantalla completa y posición de botones en móvil**:
   - Altura del Hero adaptada para que la siguiente sección no asome en la pantalla de inicio.
   - Botón «Ver menú» colocado con holgura por encima de la barra de navegación flotante de Safari.
   - Difuminado inferior del Hero con la misma fórmula suave del Header.
6. **Rediseño editorial de «Sobre nosotros» (Opción A)**:
   - Eliminada la frase artificial "Nuestra Esencia" y cambiada por **«Sobre nosotros»** (y traducciones EN/DE).
   - Bloque plano verde transformado en un degradado editorial suave continuo hacia el fondo crema cálido.
   - Sustituido "Esencia mediterránea" por **«100% Sabor mediterráneo»**.
7. **Rediseño de los Separadores de Sección**:
   - Eliminado el recuadro/medallón central circular.
   - Líneas de bandera italiana y española continuas de borde a borde de la pantalla.
   - Incorporado el símbolo de la **Rama de Olivo Silvestre** con su fruto en el centro.

---

## 2. Archivos modificados
- `web/src/components/Hero.astro`
- `web/src/components/Header.astro`
- `web/src/components/About.astro`
- `web/src/components/ui/SectionDivider.astro`
- `web/src/components/Preloader.astro`
- `web/src/components/MobileMenu.astro`
- `web/src/components/Footer.astro`
- `web/src/layouts/Layout.astro`
- `web/src/styles/global.css`
- `web/src/data/translations.ts`

---

## 3. Problemas solucionados
- Bloqueo de reproducción de vídeo en iOS al recargar por primera vez.
- Header activándose de golpe demasiado pronto sobre el Hero.
- Decoloración a verde lima del marco superior en Safari iOS.
- Asomo no deseado del texto de la segunda página en la portada móvil.
- Estilo rígido y estático en el bloque de Sobre Nosotros.
- Separadores cortados con recuadro tosco en medio de las secciones.

---

## 4. Qué queda pendiente
- Revisar en el móvil la navegación completa de la carta digital y flujos de reserva.
- Validar las variantes de la carta digital de vino/comida creadas en el estudio para integrarlas según convenga.
