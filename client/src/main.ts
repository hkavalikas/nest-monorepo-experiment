import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@client/app.module';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AllExceptionsFilter } from '@common/errors/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from '@common/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Patch NestJS Swagger to work with Zod schemas
  patchNestJsSwagger();

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Swagger Doc')
    .setDescription("Let's see if it works")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(env.PORT);
}
bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
