# Subir el sitio a BaeHost

Para Fernando. El sitio es HTML estático: no necesita PHP, ni base de datos, ni
Node. Se copian los archivos y anda.

## Qué subir

Todo el contenido de esta carpeta a **`public_html/`**, respetando la estructura.
Son **59 archivos, 2.67 MB**.

```text
public_html/
├── .htaccess          ← importante, ver abajo
├── index.html
├── tienda.html
├── mayoristas.html
├── servicio-tecnico.html
├── nosotros.html
├── contacto.html
├── soul.html
├── 404.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── htg-assets/        (42 archivos: fotos, logos, marcas/)
└── upload/            (4 banners de SOUL)
```

**No subir** `README.md` ni `DEPLOY.md` — no molestan, pero no hacen nada.

Todas las rutas del sitio son relativas, así que también funciona desde una
subcarpeta si hace falta probarlo antes.

## El `.htaccess`

Es el archivo que más importa y el que más fácil se pierde: **empieza con punto,
así que los clientes de FTP y el administrador de archivos de cPanel lo ocultan
por defecto**. Hay que activar "mostrar archivos ocultos" antes de subir.

Sin él pasan tres cosas, todas silenciosas:

- El `404.html` no se usa nunca y se ve la página de error de BaeHost.
- El CSS viaja sin comprimir: 110 KB en vez de unos 20.
- El sitio contesta por http y por https, y para Google son dos sitios.

Adentro hay **un bloque comentado** (el de dominio canónico). Descomentarlo
recién cuando `htg.com.ar` ya apunte al servidor; si se descomenta antes, la URL
temporal de prueba deja de funcionar.

## Los dominios

Están registrados los tres: **htg.com.ar** (el principal), htgstore.com.ar y
htg-store.com.ar.

`htg.com.ar` es el que está escrito en el `<link rel="canonical">` de las siete
páginas y en el `sitemap.xml`. Los otros dos conviene dejarlos como *addon* o
*alias* apuntando al mismo `public_html`, y ahí el bloque comentado del
`.htaccess` los manda al principal solo.

Los nameservers hay que cambiarlos en **NIC.ar** por los de BaeHost. Hoy están
con los que vienen por defecto, sin tocar.

## Después de subir, chequear

1. `https://htg.com.ar/` carga y **redirige solo desde http**.
2. `https://htg.com.ar/una-url-que-no-existe` muestra la 404 **de HTG**, negra
   con el logo — no la de BaeHost.
3. `https://htg.com.ar/robots.txt` y `/sitemap.xml` contestan 200.
4. Pegar `https://htg.com.ar/` en un chat de WhatsApp: tiene que aparecer la
   tarjeta con la foto del local y el título. Si no aparece, revisar que
   `htg-assets/og-htg.jpg` haya subido.
5. Abrir con el celular y probar el menú hamburguesa.

Recién cuando los cinco den bien, mandar el `sitemap.xml` a Google Search
Console. Antes no: indexaría URLs que todavía no responden.

## Si hay que volver atrás

El repositorio es `github.com/matiasmercado88-debug/htg-web`. Cada cambio está
en su propio commit con el motivo escrito, así que se puede bajar cualquier
versión anterior y volver a subir esos archivos.

## Antes de anunciar el sitio

Hay contenido pendiente que no depende del servidor: textos legales, la
definición de cómo se cobra un pedido con envío, y el catálogo completo (hoy la
tienda muestra una selección hasta que se conecte la API de PepperLabs).

**Coordinar con Mati antes de difundir la URL.** Subirlo y probarlo se puede
hacer en cualquier momento.
