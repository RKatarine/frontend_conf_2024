import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwagger(app: INestApplication, path?: string) {
  const config = new DocumentBuilder().setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);

  if (path)
    SwaggerModule.setup(path, app, document, {
      customSiteTitle: 'API Documentation',
      // https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/
      swaggerOptions: {
        persistAuthorization: true,
        defaultModelsExpandDepth: 0,
        syntaxHighlight: {
          activate: true,
          theme: 'agate',
        },
        tryItOutEnabled: true,
        requestSnippetsEnabled: true,
        displayRequestDuration: true,
        filter: true,
      },
    });

  return document;
}
