# Electrovera · Control Interno

Dashboard estático para consultar y registrar indicadores de control interno. Está preparado para publicarse como **Static Site** en Render y para usar GitHub Actions como puerta de calidad.

## Estado y stack

- **Stack:** un único archivo HTML con CSS y JavaScript nativos; no hay framework, backend ni dependencias de ejecución.
- **Punto de entrada:** `index.html`.
- **Comandos:** `npm run validate` analiza el HTML y el JavaScript, y verifica que no se hayan reintroducido las credenciales retiradas.
- **Variables de entorno:** ninguna. `.env.example` documenta esta decisión; una aplicación estática no puede conservar secretos.
- **Datos persistentes:** las mediciones se guardan en `localStorage` y la sesión de demostración en `sessionStorage`; ambos viven solo en el navegador del usuario. Las exportaciones y respaldos se descargan localmente.

## Uso local

Se requiere Node.js 20 o superior solo para ejecutar la validación:

```bash
npm run validate
```

Abra `index.html` con un servidor estático o publíquelo en Render. No requiere proceso de servidor ni instalación de paquetes.

## Despliegue en Render

`render.yaml` define el Static Site:

- rama de producción: `production`;
- verificación de build: `npm run validate`;
- directorio publicado: la raíz del repositorio (`.`);
- despliegue automático: únicamente después de que los checks de GitHub hayan pasado (`checksPass`).

Después de subir este proyecto a GitHub, cree el servicio desde **New → Blueprint** en Render y seleccione el repositorio y la rama `production`. Render leerá `render.yaml`. Con la integración GitHub–Render autorizada, cada cambio aprobado y fusionado en `production` se desplegará automáticamente. Render admite sitios estáticos con un directorio de publicación y puede desplegar automáticamente los pushes de la rama conectada. [Documentación de Render](https://render.com/docs/static-sites)

## CI/CD

El workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) ejecuta la validación en pull requests y en pushes a `production`. Proteja la rama `production` en GitHub y exija el check **Validate static dashboard / validate** antes de fusionar.

## Riesgos conocidos

Este repositorio se entrega como demostración funcional, no como sistema de producción:

- El control de acceso es solo visual: los perfiles están en el cliente y no existe autenticación real.
- `localStorage` no es adecuado para información empresarial compartida, auditada o sensible; se pierde al limpiar el navegador y es editable por el usuario.
- Los indicadores, riesgos y evidencias esperadas se publican dentro de `index.html`; confirme que pueden exponerse antes de hacer público el repositorio.
- Las evidencias solo almacenan rutas o URLs; no existe validación, cifrado, auditoría ni control de retención.
- El archivo original incluía credenciales de prueba embebidas. Se retiraron y la validación impide que se vuelvan a incorporar. Si esas claves se usaron fuera de este archivo, deben rotarse.

Consulte [el plan de trabajo](docs/WORKPLAN.md) para la ruta de evolución hacia una solución multiusuario segura.
