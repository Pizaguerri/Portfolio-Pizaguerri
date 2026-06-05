### This is my portfolio in HUGO.

**Un portfolio de fotografia y blog estático construido con [Hugo](https://gohugo.io/), diseñado para reemplazar plataformas como Instagram, Visura, Squarespace etc, y mostrar mi trabajo en antropología visual y fotografía documental.**

---

### 📌 **Sobre el proyecto**

Este proyecto nació de la necesidad de tener un **espacio propio en la web** para compartir mi trabajo fotográfico y reflexiones sin depender de plataformas externas como Instagram. Al descubrir las **páginas estáticas** y **Hugo**, vi la oportunidad de crear un sitio web personalizable, rápido y sin costes de hosting (gracias a servicios como [Cloudflare Pages](https://pages.cloudflare.com/).

### 🎯 **Objetivos**
- **Independencia de plataformas**: No depender de redes sociales para mostrar mi trabajo.
- **Blog y Portfolio**: Usar el sitio para dar vida a mis fotos y reflexiones (escritas en Obsidian.
- **Sin costes de hosting**: Aprovechar servicios gratuitos para alojar el sitio.
- **Multilingüe**: Soporte para **catalán, español e inglés**.

---

### 🛠 **Tecnologías utilizadas**
- **[Hugo](https://gohugo.io/)** - Generador de sitios estáticos (rápido y flexible).
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Hosting gratuito para el sitio.
- **[Obsidian](https://obsidian.md/)** - Donde escribo y organizo el contenido antes de publicarlo.
- **Markdown** - Formato para escribir el contenido (posts, páginas).
- **YAML** - Para configurar menús y traducciones (`i18n/`).
- **HTML/CSS** - Personalización de templates y estilos.
---

## 📁 **Estructura del proyecto**

```bash
Portfolio/
├── content/               # Contenido del sitio (posts, páginas)
│   ├── _index.{ca,es,en}.md  # Páginas de inicio por idioma
│   ├── about.{ca,es,en}.md   # Página "Sobre mí" por idioma
│   ├── blog/               # Posts del blog
│   │   ├── _index.{ca,es,en}.md  # Lista de posts por idioma
│   │   └── {post-name}/    # Posts individuales (ej: primer-post/)
│   │       ├── index.{ca,es,en}.md
│   │       └── images/     # Imágenes del post
│   └── projects/           # Proyectos fotográficos
│       ├── _index.{ca,es,en}.md  # Lista de proyectos por idioma
│       └── {project-name}/ # Proyectos individuales
│           ├── index.{ca,es,en}.md
│           └── images/     # Imágenes del proyecto
│
├── layouts/               # Templates de Hugo
│   ├── _default/          # Templates globales (baseof.html, list.html, etc.)
│   ├── blog/              # Templates específicos del blog
│   ├── partials/          # Componentes reutilizables (header, footer, nav)
│   └── projects/          # Templates específicos de proyectos
│
├── static/                # Archivos estáticos (imágenes, CSS, JS)
│   ├── images/            # Imágenes globales (logo, perfil, etc.)
│   └── css/               # Estilos personalizados
│
├── i18n/                  # Traducciones de textos estáticos (menús, botones)
│   ├── ca.yaml            # Traducciones al catalán
│   ├── es.yaml            # Traducciones al español
│   └── en.yaml            # Traducciones al inglés
│
├── data/                  # Datos estructurados (ej: configuración de galerías)
├── archetypes/            # Plantillas para nuevos contenidos (posts, proyectos)
├── hugo.toml              # Configuración principal de Hugo
└── README.md              # Este archivo
```
#### 🚀 Cómo ejecutar el proyecto localmente

    Clona el repositorio
    Instala Hugo (si no lo tienes)
    Inicia el servidor de desarrollo: ```hugo server -D```
    El sitio estará disponible en: http://localhost:1313.
    Hugo vigilará cambios en los archivos y recargará automáticamente el navegador.
    Genera el sitio para producción:
    Los archivos se generarán en la carpeta public/.

#### 🌍 Cómo desplegar el sitio
Este proyecto está configurado para desplegarse automáticamente en Cloudflare Pages (gratis). Si quieres, puedes usar otro servicio (como GitHub Pages o Netlify)
Opción 1: Cloudflare Pages (recomendado)

#### 📝 Cómo añadir nuevo contenido
Crea una nueva carpeta en content/blog/{nombre-post}/.
Añade un archivo index. Si deseas multiidioma, crea un archivo index para cada uno {ca,es,en}.md.

```---
title: "Título del post"
description: "Descripción breve del post."
date: 2026-06-05
featured_image: "nombre-imagen.webp"
draft: false
---
## Aquí va tu contenido

```

#### Cambiar estilos CSS
Usa temas de Hugo si prefieres otra plantilla. Descarga todo del repositorio que desees y se aplicará el tema si no tienes archivos que lo sobreescriban.


## 📄 Licencia
Este proyecto está bajo licencia MIT. Puedes usar el código libremente, pero el contenido (fotos, textos) es propiedad de Pablo Izaguerri. Se ha utilizado a Claude y Mistral para este proyecto.