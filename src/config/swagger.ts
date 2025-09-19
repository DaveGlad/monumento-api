import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

/**
 * Configure and initialize Swagger documentation
 * @param app Express application instance
 */
export function setupSwagger(app: Express): void {
  // Options de base pour Swagger
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Monumento API',
        version: '1.0.0',
        description: 'API for managing monuments and user interactions',
        contact: {
          name: 'API Support',
          email: 'support@monumento.com',
        },
        license: {
          name: 'ISC',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          Error: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Error message',
              },
              data: {
                type: 'null',
                description: 'No data returned on error',
              },
            },
          },
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'User ID',
              },
              username: {
                type: 'string',
                description: 'Username',
              },
              created: {
                type: 'string',
                format: 'date-time',
                description: 'Creation date',
              },
              updated: {
                type: 'string',
                format: 'date-time',
                description: 'Last update date',
              },
            },
          },
          Monument: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'Monument ID',
              },
              title: {
                type: 'string',
                description: 'Monument title',
              },
              country: {
                type: 'string',
                description: 'Country where the monument is located',
              },
              city: {
                type: 'string',
                description: 'City where the monument is located',
              },
              buildYear: {
                type: 'integer',
                description: 'Year the monument was built',
                nullable: true,
              },
              picture: {
                type: 'string',
                description: 'URL to monument picture',
                nullable: true,
              },
              description: {
                type: 'string',
                description: 'Monument description',
                nullable: true,
              },
              created: {
                type: 'string',
                format: 'date-time',
                description: 'Creation date',
              },
            },
          },
          Favorite: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'Favorite ID',
              },
              userId: {
                type: 'integer',
                description: 'User ID',
              },
              monumentId: {
                type: 'integer',
                description: 'Monument ID',
              },
              created: {
                type: 'string',
                format: 'date-time',
                description: 'Creation date',
              },
            },
          },
          LoginRequest: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                type: 'string',
                description: 'Username',
              },
              password: {
                type: 'string',
                description: 'Password',
                format: 'password',
              },
            },
          },
          LoginResponse: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Success message',
              },
              data: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    description: 'JWT access token',
                  },
                  refreshToken: {
                    type: 'string',
                    description: 'JWT refresh token',
                  },
                  user: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
          RegisterRequest: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                type: 'string',
                description: 'Username',
              },
              password: {
                type: 'string',
                description: 'Password',
                format: 'password',
              },
            },
          },
          RefreshTokenRequest: {
            type: 'object',
            required: ['refreshToken'],
            properties: {
              refreshToken: {
                type: 'string',
                description: 'JWT refresh token',
              },
            },
          },
          MonumentCreateRequest: {
            type: 'object',
            required: ['title', 'country', 'city'],
            properties: {
              title: {
                type: 'string',
                description: 'Monument title',
              },
              country: {
                type: 'string',
                description: 'Country where the monument is located',
              },
              city: {
                type: 'string',
                description: 'City where the monument is located',
              },
              buildYear: {
                type: 'integer',
                description: 'Year the monument was built',
                nullable: true,
              },
              picture: {
                type: 'string',
                description: 'URL to monument picture',
                nullable: true,
              },
              description: {
                type: 'string',
                description: 'Monument description',
                nullable: true,
              },
            },
          },
          MonumentUpdateRequest: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Monument title',
              },
              country: {
                type: 'string',
                description: 'Country where the monument is located',
              },
              city: {
                type: 'string',
                description: 'City where the monument is located',
              },
              buildYear: {
                type: 'integer',
                description: 'Year the monument was built',
                nullable: true,
              },
              picture: {
                type: 'string',
                description: 'URL to monument picture',
                nullable: true,
              },
              description: {
                type: 'string',
                description: 'Monument description',
                nullable: true,
              },
            },
          },
          WebSocketEvent: {
            type: 'object',
            properties: {
              event: {
                type: 'string',
                description: 'Event name',
                enum: ['send_message', 'monument_message'],
              },
              data: {
                type: 'object',
                properties: {
                  monumentId: {
                    type: 'integer',
                    description: 'Monument ID',
                  },
                  message: {
                    type: 'string',
                    description: 'Message content',
                  },
                  user: {
                    type: 'string',
                    description: 'Username of the sender',
                  },
                  timestamp: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Message timestamp',
                  },
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/**/*.ts'],
  };

  try {
    // Générer la documentation Swagger
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    console.log('✅ Swagger documentation generated successfully');
    
    // Configuration des options de l'interface Swagger UI
    const swaggerUiOptions = {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Monumento API Documentation',
    };
    
    // Configurer la route pour la documentation Swagger
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocs, swaggerUiOptions));
    
    console.log('🚀 Swagger UI available at /api-docs');
  } catch (error) {
    console.error('❌ Error generating Swagger documentation:', error);
  }
}
