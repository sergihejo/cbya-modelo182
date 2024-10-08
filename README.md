# CBYA-MODELO182

CBYA-Modelo182 es una herramienta web diseñada para formatear y **generar archivos compatibles con el [modelo 182 de Hacienda](https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GI02.shtml)**, utilizado para declarar donaciones. Este proyecto es propiedad de **[CBYA Auditores](https://cbyaauditores.es)** y facilita la [creación del archivo TXT](https://sede.agenciatributaria.gob.es/static_files/Sede/Disenyo_registro/DR_100_199/archivos/182.pdf) requerido por la Agencia Tributaria.

## Características

-   **Carga de Excel**: Sube un archivo Excel con las columnas `N.I.F. / C.I.F.`, `Donante`, `Cód. Provincia`, `Población`, `En Especie`, y `Dineraria`.
-   **Formulario Web**: Completa la información requerida para el declarante, incluyendo CIF, teléfono, representante y punto de contacto.
-   **Deducción por Comunidad Autónoma**: Especifica el porcentaje de deducción aplicable.
-   **Generación de TXT**: Obtendrás un archivo TXT que cumple con los requisitos del modelo 182 de Hacienda.

## Despliegue en Producción

Puedes acceder a la versión en producción de la aplicación en `https://modelo182.cbyaauditores.es`.

## Instalación y Ejecución en Local

El proyecto se compone de un frontend desarrollado en React y un backend en NestJS. Recomiendo utilizar `pnpm` para gestionar las dependencias.

### Requisitos

-   Node.js (v14 o superior)
-   PNPM (v6 o superior)

### Pasos de Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/sergihejo/cbya-modelo182.git
    cd cbya-modelo182
    ```

2. **Instala las dependencias**:

    ```bash
    pnpm install
    ```

3. **Ejecución del Backend**:

    ```bash
    cd backend
    pnpm run start:dev
    ```

4. **Ejecución del Frontend**:

    ```bash
    cd frontend
    pnpm run start
    ```

5. **Acceso a la Aplicación**:

    La aplicación estará disponible en `http://localhost:3000`.

## Contribuciones

Si deseas contribuir a este proyecto, por favor, abre un [issue](https://github.com/sergihejo/cbya-modelo182/issues) o un [pull request](https://github.com/sergihejo/cbya-modelo182/pulls) en GitHub.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
