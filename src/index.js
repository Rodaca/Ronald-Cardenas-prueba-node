const app = require('./app/app.js');

// Definir el puerto en el que se ejecutará el servidor
const port = process.env.PORT || 9000; // Si el puerto está definido en las variables de entorno, úsalo; de lo contrario, usa el puerto 9000 por defecto

// Iniciar el servidor y escuchar las solicitudes en el puerto especificado
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); //Mensaje si todo es correcto 
}).on('error', (err) => {
    console.error(`Error starting server: ${err.message}`); //Mesaje si hay algun error
});
