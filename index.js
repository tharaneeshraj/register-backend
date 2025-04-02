const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API Project Registration Form",
      description: "Exposes User Registration APIs.",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:8080/api/users"
      }
    ],
    paths: {
      "/": {
        post: {
          tags: ["Create User"],
          description: "Registers a user",
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserData" }
              }
            }
          },
          responses: {
            201: { description: "Registration Successfull" },
            400: { description: "User already exists or input is invalid" }
          }
        },
        get: {
          tags: ["Get User"],
          description: "Lists all registered users",
          responses: {
            200: {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/GetUserData" }
                  }
                }
              }
            },
            500: { description: "Server error" }
          }
        }
      },
      "/{id}": {
        get: {
          tags: ["Get User"],
          description: "Retrieves a user",
          parameters: [
            {
              name: "id",
              description: "Unique identifier for the user.",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: {
              description: "User found",
              content: { "application/json": { schema: { $ref: "#/components/schemas/GetUserData" } } }
            },
            400: { description: "User not found" }
          }
        },
        put: {
          tags: ["Update User"],
          description: "Updates a user",
          parameters: [
            {
              name: "id",
              description: "Unique identifier for the user.",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserData" }
              }
            }
          },
          responses: {
            200: { description: "User updated successfully" },
            400: { description: "User not found" }
          }
        },
        delete: {
          tags: ["Delete User"],
          description: "Deletes a user",
          parameters: [
            {
              name: "id",
              description: "Unique identifier for the user.",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: { description: "User deleted successfully" },
            400: { description: "User not found" }
          }
        }
      }
    },
    components: {
      schemas: {
        UserData: {
          type: "object",
          properties: {
            name: { type: "string", example: "Mike Tyson" },
            age: { type: "integer", example: 24 },
            dob: { type: "string", example: "2000-01-01", format: "date" },
            password: { type: "string", example: "password123" },
            cpswd: { type: "string", example: "password123" },
            about: { type: "string", example: "I am Mern stack developer" }
          }
        },
        GetUserData: {
          type: "object",
          properties: {
            _id: { type: "string", example: "unique-id-123" },
            name: { type: "string", example: "Mike Tyson" },
            age: { type: "integer", example: 24 },
            dob: { type: "string", example: "2000-01-01", format: "date" },
            password: { type: "string", example: "password123" },
            cpswd: { type: "string", example: "password123" },
            about: { type: "string", example: "I am Mern stack developer" },
            __v: { type: "integer", example: 0 }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"] 
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/users", require("./routes/userroutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
