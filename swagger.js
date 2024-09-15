const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "INVENTORY MANAGEMENT PRIVATE API DOC",
      version: "1.0.0",
      description: "Inventory Management Application",
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
