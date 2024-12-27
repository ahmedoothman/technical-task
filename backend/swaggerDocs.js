const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API documentation for Backend Task',
            version: '1.0.0',
            description: 'API documentation for Backend Task',
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1',
            },
        ],
    },
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = { swaggerUi, swaggerSpec };
