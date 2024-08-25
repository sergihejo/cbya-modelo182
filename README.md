# CBYA Prettier

This is the official documentation for the CBYA Prettier web application. The application is built using NestJS and React.

## Description

The CBYA Prettier web application is designed to format Excel files into a more readable and structured format. It provides a user-friendly interface for uploading Excel files and converting them into a desired output format.

## Features

-   Upload Excel files
-   Convert Excel files into a structured format
-   Customize output format
-   Download converted files

## Installation

You can access the CBYA Prettier web application at [https://prettier.cbyaauditores.es/](https://prettier.cbyaauditores.es/).

However, if you would like to install and run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/cbya-prettier.git`
2. Navigate to the project directory: `cd cbya-prettier`
3. Install dependencies: `npm install`
4. Start the backend server: `npm run start:server`
5. Start the frontend development server: `npm run start:client`
6. Open your browser and visit `http://localhost:3000`

## Usage

1. Open the App Name application in your browser.
2. Click on the "Upload" button to select an Excel file.
3. Choose the desired output format.
4. Click on the "Convert" button to start the conversion process.
5. Once the conversion is complete, you can download the converted file.

## Contributing

Contributions are welcome! If you would like to contribute to the App Name application, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

# CBYA182Formatter

CBYA182Formatter es una herramienta web diseñada para formatear y generar archivos compatibles con el modelo 182 de Hacienda, utilizado para declarar donaciones. Este proyecto es parte de la suite de herramientas de [CBYA Auditores](https://cbyaauditores.es) y facilita la creación de los archivos TXT requeridos por la Agencia Tributaria.

## Características

-   **Carga de Excel**: Sube un archivo Excel con las columnas `N.I.F. / C.I.F.`, `Donante`, `Cód. Provincia`, `Población`, `En Especie`, y `Dineraria`.
-   **Formulario Web**: Completa la información requerida para el declarante, incluyendo CIF, teléfono, representante y punto de contacto.
-   **Deducción por Comunidad Autónoma**: Especifica el porcentaje de deducción aplicable.
-   **Generación de TXT**: Obtendrás un archivo TXT que cumple con los requisitos del modelo 182 de Hacienda.

## Instalación y Ejecución en Local

El proyecto se compone de un frontend desarrollado en React y un backend en NestJS. Recomiendo utilizar `pnpm` para gestionar las dependencias.

### Requisitos

-   Node.js (v14 o superior)
-   PNPM (v6 o superior)

### Pasos de Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/sergihejo/CBYA182Formatter.git
    cd CBYA182Formatter
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

## Despliegue en Producción

Puedes acceder a la versión en producción de la aplicación en `https://modelo182.cbyaauditores.es`.

## Contribuciones

Si deseas contribuir a este proyecto, por favor, abre un "issue" o un "pull request" en GitHub.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
