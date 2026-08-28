# HTG — sitio web

Sitio de HTG (mayorista de tecnología, Pilar, Buenos Aires). HTML, CSS y JavaScript
sin dependencias ni build: se sirve como archivos estáticos.

```bash
python -m http.server 4173
```

Y abrir `http://localhost:4173`.

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Home: hero, categorías, banda mayorista, destacados, carrusel de banners, marcas, FAQ |
| `tienda.html` | Catálogo con búsqueda, filtros, orden, vistas y carrito |
| `mayoristas.html` | Venta mayorista: catálogo por rubro, proceso de compra |
| `servicio-tecnico.html` | Diagnóstico, proceso de reparación y alcance del servicio |
| `nosotros.html` | Identidad, local, pilares y forma de trabajo |
| `contacto.html` | Canales, mapa, horarios y formulario |
| `soul.html` | Micrositio de la marca SOUL |

## Estructura

```
styles.css      hoja única, por secciones comentadas
script.js       nav mobile, carruseles, filtros de tienda, carrito, formulario
htg-assets/     fotos, productos y logos de marcas
upload/         banners de campaña
```

## Convenciones

- **Tipografía**: Barlow Condensed (títulos, uppercase) + Inter (texto)
- **Color**: negro `#0a0a0a`, crema `#f5f4f1`, naranja `#ff5a00` (sólo acento: hover, estado activo, filetes)
- **Íconos**: SVG embebidos como CSS mask (`.ico-*`), se recolorean con `currentColor`
- **Fotos de producto sobre fondo blanco**: se componen con `mix-blend-mode: multiply` para
  que el recuadro blanco desaparezca contra el fondo. No funciona sobre fondos oscuros.
- Respeta `prefers-reduced-motion` en todas las animaciones

## Pendientes

- El buscador del header manda `?q=` a la tienda pero el parámetro todavía no se lee
- Links `#` en el footer: bloque Cuenta (requiere login) y textos legales
- Facebook sin URL (Instagram y WhatsApp ya apuntan a las cuentas reales)
- El formulario de contacto abre WhatsApp con el mensaje armado; no hay backend
