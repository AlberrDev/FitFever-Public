<div align="center" style="display: flex; align-items: center; justify-content: center;">
  <h1 style="margin-right: 10px;">FitFever</h1>
  <img src="https://github.com/AlberrDev/FitFever/assets/120364984/3d052841-15cb-49e8-a14f-511798863607" alt="FitFever" width="50">
</div>
<div align="center">

[![FitFever](https://img.shields.io/badge/FitFever-Off-red?style=for-the-badge&logo=vercel&logoColor=white&labelColor=101010)](https://fit-fever.vercel.app/)

</div>

## Descripción
Este es un proyecto desarrollado por Alberto Martínez Marín. El proyecto consiste en una aplicación que facilita la nutrición y el bienestar mediante el uso de herramientas creadas específicamente para cubrir las necesidades de los usuarios interesados en mejorar su salud.

## Requisitos

- Es necesario tener instalado Docker.
- Es recomendable tener Make instalado. Si no lo tienes, puedes copiar los comandos del Makefile y ejecutarlos manualmente.

## Instalación
1. Descarga el proyecto en zip o clónalo con Git.
2. Copia y modifica el fichero `env.example` con el nombre `.env` (Está preparado para funcionar pero se recomienda personalizarlo).
3. Usa el comando `make start` del Makefile del proyecto. Esto levantará la aplicación.
4. Tendrás que realizar las migraciones ejecutando el comando `make django-migrate`
5. Tendrás que crear un super usuario en Django con `make django-createsuperuser`

## Uso
1. Accede a la aplicación por defecto desde:
   - [http://127.0.0.1:8000](http://127.0.0.1:8000) (Servidor)
   - [http://172.18.0.2:3000](http://172.18.0.2:3000) (Cliente)

## 🚀 Tecnologías
<div align="center">
  
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&labelColor=101010)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=F7DF1E&labelColor=101010)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=101010)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-yellow?style=for-the-badge&logo=python&logoColor=white&labelColor=101010)]()
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white&labelColor=101010)](https://www.djangoproject.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=2496ED&labelColor=101010)](https://www.docker.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=FFCA28&labelColor=101010)](https://firebase.google.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=4169E1&labelColor=101010)](https://www.postgresql.org/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=764ABC&labelColor=101010)](https://redux.js.org/)
[![BeautifulSoup](https://img.shields.io/badge/BeautifulSoup-4B8BBE?style=for-the-badge&logo=python&logoColor=4B8BBE&labelColor=101010)](https://www.crummy.com/software/BeautifulSoup/)
</div>

## Licencia
Este proyecto está bajo la Licencia CC BY-NC-SA 4.0. Consulta la web de [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/4.0/) para más información.

### Nota
Se ha utilizado la técnica de web scraping para obtener los productos de la página.
