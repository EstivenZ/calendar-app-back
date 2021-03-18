const cors= require('cors');
const express= require('express');
const { dbConnection } = require('./db/db');
require('dotenv').config();

//Crear el servidor de express
const app= express();

//Swagger
const swaggerJsDoc= require("swagger-jsdoc");
const swaggerUi= require("swagger-ui-express");

//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions= {
  swaggerDefinition: {
    info: {
      title: 'Calendar API',
      description: 'Informacion Reservas API ',
      contact: {
        name: "Estiven Zapata"
      },
      host:["http://localhost:4000"]
    }
  },
  //['.routes/*.js]
  apis:["index.js"]
};

const swaggerDocs= swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 

// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/customers", (req, res) => {
    res.status(200).send("Customer results");
  });

//Correr base de datos
dbConnection();

//Cors
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: Crud de eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});
