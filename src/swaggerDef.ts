import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your Next Trip API',
      version: '1.0.0',
      description: 'API documentation for Your Next Trip backend',
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;