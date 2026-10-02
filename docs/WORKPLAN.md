# Plan de trabajo para cambios futuros

## Flujo normal

1. Cree una rama desde `main` con un nombre descriptivo.
2. Haga el cambio y ejecute `npm run validate`.
3. Abra un pull request. La validación de GitHub Actions debe finalizar correctamente.
4. Revise funcionalidad, accesibilidad y cualquier dato sensible mostrado.
5. Acepte el pull request hacia `main`.
6. Render desplegará automáticamente el commit cuando el chequeo de CI sea exitoso.

## Controles por tipo de cambio

| Cambio | Validación mínima | Aprobación recomendada |
| --- | --- | --- |
| Texto, estilos o indicadores | Navegadores de escritorio y móvil | Dueño funcional |
| Cálculos, exportación o respaldo | Casos de prueba con datos de ejemplo | Control interno + responsable técnico |
| Identidad, API o persistencia | Pruebas de autorización y revisión de secretos | Seguridad + responsable técnico |
| Dependencias o configuración de despliegue | CI, vista previa de Render y revisión del diff | Responsable técnico |

## Evolución prioritaria antes de producción real

1. Sustituir el modo demostración por autenticación centralizada (OIDC/Supabase Auth u otro proveedor).
2. Mover usuarios, mediciones, evidencias y permisos a una API y base de datos con control de acceso por fila.
3. Guardar evidencias en almacenamiento privado con URLs firmadas y auditoría.
4. Añadir auditoría inmutable, copias de seguridad y política de retención.
5. Separar datos de configuración desde `index.html` y cubrir cálculos con pruebas automatizadas.
