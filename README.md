# Plantilla para proyectos con React y Express.

Esta plantilla tiene lo necesario para comenzar un proyecto usando React en el front-end, concretamente usando Create-React-App, y para el backend usamos el conjunto de herramientas formado por: MongoDB, NodeJs y Express. 

## Antes de comenzar

Antes de comenzar será necesario dentro del directorio /backend crear un archivo .env (Archivo de configuración de variables). En este archivo tendremos que poner las siguientes variables como mínimo:
-  ATLAS_URI
- SESS_NAME
- SESS_SECRET
- SESS_LIFETIME
- mode
- port

## Una vez tenemos el proyecto configurado.

### Descripción Estructura

Tenemos dos grandes directorios. Backend y src. Estos son nuestros directorios base. Cualquier cosa del frontend estará dentro de la carpeta src, y cualquier cosa del backend estará en la carpeta backend. 
A continuación se detallan estos directorios.

#### Frontend
En la carpeta frontend nos encontramos con tres carpetas principales: components, pages, utils. 

Debemos sentirnos libres a la hora de crear más carpetas pero siempre teniendo en cuenta qué estamos creando y dentro de cual de nuestras grandes secciones va. 
Por ejemplo: Si quiero crearme una carpeta con subcomponentes para una página, como puede ser "Tabla con todos los clientes" pues irá dentro de pages/clientes/tablaClientes, pero nunca dentro de components o utils.

##### components
Aquí es donde vamos a alojar todos nuestros componentes abstractos, nos referimos a botones, tablas, inputs, modals, etc... Es decir todo aquello que no depende del contexto, sino que son elementos luego usaremos en nuestras páginas. 

##### pages
Aquí es donde vamos a tener todas nuestras páginas de la aplicación, es decir, por cada sección de nuestra aplicación o ruta, tendremos una carpeta donde iremos creando todo lo necesario para dicha sección.

##### utils
Esta carpeta está dividida por dos carpetas principales. api e interfaces. 

La carpeta api tendrá un fichero por cada grupo de rutas en nuestro backend. Por ejemplo si tenemos en nuestro backend un grupo que empieza por /authentication y otro por clientes/, pues tendremos un fichero para todas las rutas de authentication y otro fichero para todas las rutas de clientes. Esto nos va permitir organizar todos nuestras peticiones y end points de manera clara.

La carpeta interfaces tendrá todas nuestras interfaces o tipos para usar con TypeScript. De esta manera un cambio en cualquier modelo debemos venir a esta carpeta a modificar la interfaz de este modelo, para que backend y frontend estén sincronizados.


#### Backend


### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
