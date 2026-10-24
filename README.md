# Buon Appetito — Cocina Mediterránea y Pizzería Artesanal

Sitio web oficial de **Buon Appetito**, ubicado en primera línea del puerto pesquero y deportivo de Port d'Andratx, Mallorca.

Desarrollado con arquitectura moderna, ultra ligera y de alto rendimiento utilizando **Astro** y **Tailwind CSS v4**.

---

## 🍕 Características Principales

- **Arquitectura Astro (Static Site Generation):** Carga instantánea, 0kb de JavaScript innecesario y máxima puntuación en Core Web Vitals.
- **Tailwind CSS v4:** Sistema de diseño personalizado con tokens de color mediterráneo (marfil `#FBF9F5`, verde oliva `#183321`, terracota `#9E4221`) y tipografías *Playfair Display* y *Plus Jakarta Sans*.
- **Mobile First & 100% Responsive:** Experiencia táctil cuidada al detalle, carruseles horizontales con `scroll-snap`, menú drawer editorial con bloqueo estricto de scroll de fondo y formulario de reservas optimizado.
- **Infografía "La Nostra Pizza":** Recreación gráfica artesanal de la pizza napolitana con trazos y flechas vectoriales SVG hechas a mano.
- **Reservas Directas por WhatsApp:** Formulario interactivo con selector de comensales, turnos de horario, preferencia de espacio (Terraza Puerto o Salón Interior) y confirmación inmediata sin intermediarios.
- **Google Maps Interactivo:** Mapa oficial embebido centrado en Av. Mateo Bosch, 24 con botón flotante directo "CÓMO LLEGAR".

---

## 🛠️ Tecnologías

- [Astro](https://astro.build/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Material Symbols Outlined](https://fonts.google.com/icons)
- [Google Fonts](https://fonts.google.com/) (Playfair Display & Plus Jakarta Sans)

---

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en http://localhost:4321
npm run dev

# Compilar para producción
npm run build

# Previsualizar el resultado de producción
npm run preview
```

---

## ☁️ Despliegue en Cloudflare Pages

1. Conectar este repositorio (`musa3101/W-baa`) en el panel de Cloudflare Pages.
2. Parámetros de compilación:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Desplegar con un clic.
