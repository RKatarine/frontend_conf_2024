import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwagger } from './create-swagger';
import { generateApi } from './generate-api';
import { ValidationExceptionFilter, ValidationPipe } from './validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.enableCors();

  const document = createSwagger(app, 'api-docs');

  const port = process.env.PORT || 3000;

  console.log(`Listening on port ${port}`);

  // is local development
  if (process.env.NODE_ENV !== 'production') {
    await Promise.all([
      generateApi({
        output: '../client/src/api-client/api2',
        document,
      }),
      app.listen(port),
    ]);
  } else {
    await app.listen(port);
  }
}
bootstrap();
